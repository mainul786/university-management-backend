import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRouter } from './modules/Student/Student.route';
import { UserRouter } from './modules/User/User.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', studentRouter);
app.use('/api/v1/user', UserRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
