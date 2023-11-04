import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';
import { ICustomerRepository } from '@app/ep/modules/customer/domain/customer.repository';
import { IUserRepository } from '@app/ep/modules/user/domain/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 3,
        jwksUri: `https://cognito-idp.${configService.get(
          'AWS_REGION',
        )}.amazonaws.com/${configService.get(
          'AWS_COGNITO_USER_POOL_ID',
        )}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      _audience: configService.get('AWS_COGNITO_CLIENT_ID'),
      issuer: `https://cognito-idp.${configService.get(
        'AWS_REGION',
      )}.amazonaws.com/${configService.get('AWS_COGNITO_USER_POOL_ID')}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    if (payload['cognito:groups'].includes('Customers')) {
      const customer = await this.customerRepository.getOne({
        cognitoId: payload.sub,
      });

      if (!customer) {
        throw new Error('Customer not found');
      }

      return {
        cognitoId: payload.sub,
        userId: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      };
    }

    if (payload['cognito:groups'].includes('Users')) {
      const user = await this.userRepository.getByCognitoId(payload.sub);
      console.log('user', user);
      if (!user) {
        throw new Error('User not found');
      }

      return {
        cognitoId: payload.sub,
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };
    }
  }
}
