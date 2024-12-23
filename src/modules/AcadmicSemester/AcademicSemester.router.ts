import express from 'express';
import { AcademicSemesterControllers } from './AcademicSemeter.controllers';
import validateRequest from '../../middlware/validateRequest';
import { AcademicSemesterValidations } from './AcademicSemester.validation';
import auth from '../../middlware/auth';
import { USERROLE } from '../User/User.constant';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USERROLE.superAdmin, USERROLE.admin),
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidation),
  AcademicSemesterControllers.createAcdemicSemester,
);
router.get(
  '/',
  auth(USERROLE.superAdmin, USERROLE.admin, USERROLE.faculty, USERROLE.student),
  AcademicSemesterControllers.getAllAcademicSemester,
);
router.get(
  '/:semesterId',
  auth(USERROLE.superAdmin, USERROLE.admin),
  AcademicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  auth(USERROLE.superAdmin, USERROLE.admin),
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidation),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const academicSemesterRouter = router;
