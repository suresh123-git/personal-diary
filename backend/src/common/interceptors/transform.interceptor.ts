import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((result) => {
        // If result is already structured with meta
        if (result && typeof result === 'object' && 'data' in result) {
          return {
            success: true,
            data: result.data,
            meta: result.meta,
            timestamp: new Date().toISOString(),
          };
        }

        return {
          success: true,
          data: result,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
