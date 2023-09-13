import { Controller, Get } from '@nestjs/common';
import { CommServiceService } from './comm-service.service';

@Controller()
export class CommServiceController {
  constructor(private readonly commServiceService: CommServiceService) {}

  @Get()
  getHello(): string {
    return this.commServiceService.getHello();
  }
}
