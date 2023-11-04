import {
  Controller,
  HttpStatus,
  Post,
  Body,
  BadRequestException,
  Get,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserAuthGuard } from '@app/ep/modules/auth/auth.guard';
import { LoginUserDto } from '@app/ep/modules/user/infra/api/dtos/login-user.dto';
import { CreateUserDto } from '@app/ep/modules/user/infra/api/dtos/register-user.dto';
import { UserService } from '@app/ep/modules/user/application/user.service';
import { PaginationDto } from '@app/ep/shared/utils/pagination';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/api/users')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for creating users',
  })
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
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

  @Get('/api/users/couriers')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint',
  })
  @UseGuards(UserAuthGuard)
  async getCouriers(@Query() pagination: PaginationDto) {
    try {
      return await this.userService.getCouriers({ pagination });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
