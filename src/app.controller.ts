import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Controller()
export class AppController {
  constructor(@InjectModel() private readonly knex: Knex) {}

  @Get('/health')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for checking if app is up and running',
  })
  getHello(): string {
    // this.knex.raw('select 1+1 as result').then(() => {
    //   console.log('Knex is up and running');
    // });

    this.knex
      .table('User')
      .insert({
        id: randomUUID(),
        email: 'wer',
        cognitoId: randomUUID(),
        firstName: 'sdsad',
        lastName: 'asd',
        role: 'COURIER',
      })
      .then((e) => {
        console.log('e', e);
      });
    return 'Ok';
  }
}
