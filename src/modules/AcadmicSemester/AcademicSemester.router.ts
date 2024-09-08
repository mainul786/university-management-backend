import express from 'express';
import { academicSemesterControllers } from './AcademicSemeter.controllers';
import validateRequest from '../../middlware/validateRequest';
import { AcademicSemesterValidations } from './AcademicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidation),
  academicSemesterControllers.createAcdemicSemester,
);

export const academicSemesterRouter = router;
