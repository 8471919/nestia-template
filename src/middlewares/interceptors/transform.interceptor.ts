import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { InputData } from './global.interceptor';

export type TransformInterceptorResponse<T> = {
  success: true;
  code: 200;
  data: T;
};

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: InputData<unknown>) => {
        return {
          success: true,
          code: 200,
          ...data,
        } as TransformInterceptorResponse<unknown>;
      }),
    );
  }
}
