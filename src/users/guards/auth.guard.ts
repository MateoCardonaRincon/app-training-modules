import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();

    const req = http.getRequest();

    if (req.headers.authorization === 'Bearer ' + process.env.AUTH_TOKEN)
      return true;

    return false;
  }
}
