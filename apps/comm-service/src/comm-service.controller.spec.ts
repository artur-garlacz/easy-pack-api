import { Test, TestingModule } from '@nestjs/testing';
import { CommServiceController } from './comm-service.controller';
import { CommServiceService } from './comm-service.service';

describe('CommServiceController', () => {
  let commServiceController: CommServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommServiceController],
      providers: [CommServiceService],
    }).compile();

    commServiceController = app.get<CommServiceController>(CommServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(commServiceController.getHello()).toBe('Hello World!');
    });
  });
});
