import { Injectable } from '@nestjs/common';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import {
  SignUpCommand,
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly identityPoolId: string;
  private readonly userPoolId: string;
  private readonly clientId: string;
  private readonly region: string;

  private readonly cognitoClient: CognitoIdentityProviderClient;

  constructor(private configService: ConfigService) {
    this.identityPoolId = this.configService.get<string>(
      'AWS_COGNITO_IDENTITY_POOL_ID',
    );
    this.userPoolId = this.configService.get<string>(
      'AWS_COGNITO_USER_POOL_ID',
    );
    this.region = this.configService.get<string>('AWS_REGION');
    this.clientId = this.configService.get<string>('AWS_COGNITO_CLIENT_ID');
    const clientConfig = {
      region: this.region,
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: this.region }),
        identityPoolId: this.identityPoolId,
      }),
    };

    this.cognitoClient = new CognitoIdentityProviderClient(clientConfig);
  }

  async signUpUser(email: string, password: string): Promise<void> {
    const signUpCommand = new SignUpCommand({
      ClientId: this.clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    });

    try {
      const w = await this.cognitoClient.send(signUpCommand);

      console.log(w);
    } catch (error) {
      // Handle error
    }
  }

  async addUserToCustomGroup(email: string, groupName: string): Promise<void> {
    const addUserToGroupCommand = new AdminAddUserToGroupCommand({
      GroupName: groupName,
      UserPoolId: this.userPoolId,
      Username: email,
    });

    return new Promise((resolve, reject) => {
      this.cognitoClient
        .send(addUserToGroupCommand)
        .then((response) => {
          console.log('response', response);
          // Handle success
          resolve();
        })
        .catch((error) => {
          // Handle error
          reject(error);
        });
    });
  }

  async loginUser(email: string, password: string): Promise<string> {
    const initiateAuthCommand = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    try {
      const response = await this.cognitoClient.send(initiateAuthCommand);
      return response.AuthenticationResult?.AccessToken ?? '';
    } catch (error) {
      // Handle error
      throw error;
    }
  }
}
