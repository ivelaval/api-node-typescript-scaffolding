import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { dynamicRoutes } from './routes/index.js';
import { isInvalid } from './utils/strings.js';
var PORT = process.env.PORT;
if (isInvalid(PORT)) {
    throw new Error('Server port not was pre-configured');
}
var app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(dynamicRoutes);
app.get('/ping', function (req, res) {
    res.send('pong!');
});
app.listen(PORT, function () {
    console.log("Server is listening on port ".concat(PORT));
});
//# sourceMappingURL=index.js.map