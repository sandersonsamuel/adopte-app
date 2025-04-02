import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization?.split(' ')[1];
    req['token'] = accessToken;
    next();
  }
}
