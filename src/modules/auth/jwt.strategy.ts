import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';
import { ICustomerRepository } from 'src/modules/customer/domain/customer.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
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
    console.log(payload['cognito:groups'].includes('Customers'));
    if (payload['cognito:groups'].includes('Customers')) {
      const customer = await this.customerRepository.getByCognitoId(
        payload.sub,
      );

      return { userId: payload.sub, user: customer.id, email: customer.email };
    }
    return { userId: payload.sub };
  }
}
