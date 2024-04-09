import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { dynamicRoutes } from './routes/index.js';
import { isInvalid } from './utils/strings.js';
import swaggerInit from './utils/swagger.js';
const { PORT } = process.env;

if (isInvalid(PORT)) {
  throw new Error('Server port not was pre-configured');
}

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(dynamicRoutes);

app.get('/ping', (req, res) => {
  res.send('pong!');
});

swaggerInit(app, PORT, '1.0.0');

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
