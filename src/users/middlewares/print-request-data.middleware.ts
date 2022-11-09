import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PrintRequestDataMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Método HTTP:', req.method, '\nbody: ', req.body);

    if (req.method === 'PUT') console.log('UUID: ', req.params.uuid);

    next();
  }
}
