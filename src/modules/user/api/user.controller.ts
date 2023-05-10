import { Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class User {
  @Post('/api/auth/user/register')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for checking if app is up and running',
  })
  registerUser(): string {
    return 'Ok';
  }
}
