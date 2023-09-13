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
import { UserAuthGuard } from '@app/ep/modules/auth/auth.guard';
import { LoginUserDto } from '@app/ep/modules/user/infra/api/dtos/login-user.dto';
import { RegisterUserDto } from '@app/ep/modules/user/infra/api/dtos/register-user.dto';
import { UserService } from '@app/ep/modules/user/application/user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/api/users/sign-up')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for registration users (OWNER)',
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
