import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { tags } from 'typia';
import { ErrorMessageType } from 'src/utils/types/error-message.type';

export type ErrorResponseForm<T extends ErrorMessageType> = {
  success: false;
  timestamp: string & tags.Format<'date-time'>;
  path: string & tags.Format<'url'>;
} & T;

export const GLOBAL_FILTERS = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
];
