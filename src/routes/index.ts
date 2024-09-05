import express from 'express';
import { StudentRouter } from '../modules/Student/Student.route';
import { UserRouter } from '../modules/User/User.route';

const router = express.Router();

const moduleRouter = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/students',
    route: StudentRouter,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
