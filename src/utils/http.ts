import type { Request, Response, NextFunction } from 'express';

export const tryCatch =
  (controller: (req: Request, res: Response) => void) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      controller(req, res);
    } catch (error) {
      next(error);
    }
  };
