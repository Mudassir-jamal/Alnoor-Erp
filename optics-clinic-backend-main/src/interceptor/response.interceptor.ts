import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface StandardResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, StandardResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        console.log('MEsssaaaageee in interceptor', data);
        return { success: true, data };
      }),
      // catchError((error) => {
      //   const response = error.getResponse();
      //   const status = error.getStatus();
      //   return throwError({
      //     success: false,
      //     message: response?.message || 'Something went wrong',
      //     data: null,
      //     status,
      //   });
      // }),
    );
  }
}
