import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  TransformInterceptor,
  TransformInterceptorResponse,
} from './transform.interceptor';
import {
  ElapseInterceptor,
  ElapseInterceptorResponse,
} from './elapse.interceptor';
import { ErrorMessageType } from 'src/utils/types/error-message.type';
import { ErrorResponseForm } from '../filters/global.filter';

/**
 * @param T 컨트롤러의 리턴 타입
 * @param E 컨트롤러에서 던지는 에러타입
 * @description Nestia는 Union Type에서 맨 앞의 타입을 Swagger로 리턴하므로,
 * Error가 아닌 정상적인 Response 타입을 맨 앞에 설정하면 됩니다.
 * ErrorResponseForm타입은 SDK의 편의를 위하여 ResponseForm에 등록하였습니다.
 * Partial을 적용한 이유는, Controller에서 data 속성만 리턴할 수 있도록 하기 위함입니다.
 */
export type ResponseForm<
  T,
  E extends ErrorMessageType | null = null,
> = E extends ErrorMessageType
  ?
      | Partial<TransformInterceptorResponse<T> & ElapseInterceptorResponse>
      | Partial<ErrorResponseForm<E>>
  : Partial<TransformInterceptorResponse<T> & ElapseInterceptorResponse>;

export interface InputData<T> {
  data: T;
}

/**
 * @param data Controller에서 Return되는 값
 * @returns Interceptor로 들어가는 값
 */
export const createResponse = <T>(data: T): InputData<T> => {
  return {
    data: data,
  };
};

export const GLOBAL_INTERCEPTORS = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ElapseInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
];
