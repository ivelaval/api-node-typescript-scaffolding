import { Router, type Request, type Response } from 'express';

const routes = Router();

const getDemo = async (req: Request, res: Response): Promise<void> => {
  res.send({
    message: "Start conquering the world!"
  });
};

routes.get('/', getDemo);

export { routes };
