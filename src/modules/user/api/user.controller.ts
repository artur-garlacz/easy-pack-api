import {
  Controller,
  HttpStatus,
  Post,
  Body,
  BadRequestException,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/modules/auth/auth.guard';
import { LoginUserDto } from 'src/modules/user/api/dtos/login-user.dto';
import { RegisterUserDto } from 'src/modules/user/api/dtos/register-user.dto';
import { UserService } from 'src/modules/user/application/user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/api/users/sign-up')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint',
  })
  async signUpUser(@Body() data: RegisterUserDto) {
    try {
      await this.userService.signUpUser(data);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/api/users/sign-in')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for login as a customer',
  })
  async signInUser(@Body() data: LoginUserDto) {
    try {
      return await this.userService.signIn(data);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('/api/users/me')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint',
  })
  @UseGuards(UserAuthGuard)
  async getUser(@Request() req) {
    try {
      return req.user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
