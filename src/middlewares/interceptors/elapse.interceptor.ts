import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { TransformInterceptorResponse } from './transform.interceptor';
import { tags } from 'typia';

const MS_PER_SEC = 1e6;
const NS_PER_MS = 1e3;

export type ElapseInterceptorResponse = {
  elapse: string & tags.Pattern<'^[0-9]{1,11}us'>;
} & unknown;

@Injectable()
export class ElapseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const start = process.hrtime();

    return next.handle().pipe(
      map((data: TransformInterceptorResponse<unknown>) => {
        const diff: [number, number] = process.hrtime(start);

        return {
          ...data,
          elapse:
            `${diff[0] * MS_PER_SEC + Math.floor(diff[1] / NS_PER_MS)}us` as const,
        } as ElapseInterceptorResponse;
      }),
    );
  }
}
