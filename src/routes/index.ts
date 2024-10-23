import express from 'express';
import { StudentRouter } from '../modules/Student/Student.route';
import { UserRouter } from '../modules/User/User.route';
import { academicSemesterRouter } from '../modules/AcadmicSemester/AcademicSemester.router';
import { AcademicFacultyRouter } from '../modules/AcademicFaculty/AcademicFaculty.router';
import { AcademicDepartmentRouter } from '../modules/AcademicDepartment/AcademicDepartment.router';
import { FacultyRouters } from '../modules/Faculty/Faculty.routes';
import { AdminRoutes } from '../modules/Admin/Admin.router';
import { CourseRouters } from '../modules/Course/Course.route';
import { SemesterRegistrationRoutes } from '../modules/SemesterRegistration/SemesterRegistration.route';
import { OfferedCourseRouters } from '../modules/OfferedCourse/OfferedCourse.router';

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
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/faculty',
    route: FacultyRouters,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRouters,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRouters,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
