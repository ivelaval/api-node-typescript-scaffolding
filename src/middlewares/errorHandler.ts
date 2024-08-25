import type { NextFunction, Request, Response } from 'express';

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400);
  res.send({
    error: 'Resource not found'
  });
};

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response
) => {};
