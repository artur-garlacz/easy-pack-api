import {
  Controller,
  HttpStatus,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/modules/user/api/dtos/register-user.dto';
import { UserService } from 'src/modules/user/application/user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/api/user/sign-up')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for checking if app is up and running',
  })
  async signUpUser(@Body() { email, password }: RegisterUserDto) {
    try {
      await this.userService.signUpUser(email, password);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
}
