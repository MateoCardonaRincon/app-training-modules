import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class NullableLastnameInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Array) {
          return data.map((user: UserInterface) =>
            user.lastname === undefined ? { ...user, lastname: null } : user,
          );
        }

        return data.lastname === undefined ? { ...data, lastname: null } : data;
      }),
    );
  }
}
