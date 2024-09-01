import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRouter } from './modules/Student/Student.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', studentRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
