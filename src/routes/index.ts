import express from 'express';
import { StudentRouter } from '../modules/Student/Student.route';
import { UserRouter } from '../modules/User/User.route';
import { academicSemesterRouter } from '../modules/AcadmicSemester/AcademicSemester.router';

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
  {
    path: '/academic-semesters',
    route: academicSemesterRouter,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
