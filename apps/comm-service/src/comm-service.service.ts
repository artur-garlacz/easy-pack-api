import { Injectable } from '@nestjs/common';

@Injectable()
export class CommServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
