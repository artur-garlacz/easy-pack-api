import { Module } from '@nestjs/common';
import { CommServiceController } from './comm-service.controller';
import { CommServiceService } from './comm-service.service';

@Module({
  imports: [],
  controllers: [CommServiceController],
  providers: [CommServiceService],
})
export class CommServiceModule {}
