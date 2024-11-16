import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHanlaler from './middlware/globalErrorHandler';
import notFound from './middlware/notFound';
import router from './routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'] }));

app.use('/api/v1', router);

app.use(globalErrorHanlaler);
app.use(notFound);

export default app;
