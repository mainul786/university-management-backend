import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHanlaler from './middlware/globalErrorHandler';
import notFound from './middlware/notFound';
import router from './routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.use(globalErrorHanlaler);
app.use(notFound);

export default app;
