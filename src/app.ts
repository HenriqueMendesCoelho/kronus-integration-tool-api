import express from 'express';
import { logger } from './middleware/LoggerMiddleware';
import { router } from './routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(logger);
app.use(router);

const allowedOrigins = ['*'];
const corsOpts: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOpts));

export { app };
