import { Controller, Get } from '@nestjs/common';
import {
  ResponseForm,
  createResponse,
} from './middlewares/interceptors/global.interceptor';
import { ERROR_MESSAGE } from './utils/types/error-message.type';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  async a(): Promise<ResponseForm<string, ERROR_MESSAGE.E>> {
    return createResponse('hi');
  }
}
