import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRouter } from './modules/Student/Student.route';
import { UserRouter } from './modules/User/User.route';
import globalErrorHanlaler from './middlware/globalErrorHandler';
import notFound from './middlware/notFound';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', studentRouter);
app.use('/api/v1/users', UserRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHanlaler);
app.use(notFound);

export default app;
