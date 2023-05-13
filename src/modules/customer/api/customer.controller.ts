import {
  Controller,
  HttpStatus,
  Post,
  Body,
  BadRequestException,
  Param,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CustomerAuthGuard } from 'src/modules/auth/auth.guard';
import { ConfirmAccountDto } from 'src/modules/customer/api/dtos/confirm-account.dto';
import { LoginCustomerDto } from 'src/modules/customer/api/dtos/login-customer.dto';
import { RegisterCustomerDto } from 'src/modules/customer/api/dtos/register-customer.dto';
import { CustomerService } from 'src/modules/customer/application/customer.service';

@Controller()
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('/api/customers/me')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for registration of customers',
  })
  @UseGuards(CustomerAuthGuard)
  async getMe(@Request() req: any) {
    try {
      console.log(req.user);
      return 'Luks';
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @Post('/api/customers/sign-up')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for registration of customers',
  })
  async signUpCustomer(@Body() data: RegisterCustomerDto) {
    try {
      await this.customerService.signUp(data);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @Post('/api/customers/sign-in')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for login as a customer',
  })
  async signInCustomer(@Body() data: LoginCustomerDto) {
    try {
      return await this.customerService.signIn(data);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @Post('/api/customers/confirmation')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for confirmation of registration',
  })
  async confirmAccount(@Body() data: ConfirmAccountDto) {
    try {
      return await this.customerService.confirm(data);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
}
