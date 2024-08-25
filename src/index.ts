import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { dynamicRoutes } from './routes/index.js';
import { isInvalid } from './utils/strings.js';
import swaggerInit from './utils/swagger.js';
import logger from './utils/logger.js';
const { PORT } = process.env;
import {
  notFoundMiddleware,
  errorHandlerMiddleware
} from './middlewares/errorHandler.js';

if (isInvalid(PORT)) {
  logger.error(new Error('Server port not was pre-configured'));
}

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
// app.use(notFoundMiddleware);

app.use(dynamicRoutes);

app.get('/ping', (req, res) => {
  res.send('pong!');
});

swaggerInit(app, PORT, '1.0.0');

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
