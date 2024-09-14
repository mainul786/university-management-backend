import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { academicFacultyValidation } from './AcademicFaculty.validation';
import { AcademicFacultyControllers } from './AcademicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch('/:facultyId', AcademicFacultyControllers.updateAcdemicFaculty);
router.get(
  '/',
  validateRequest(academicFacultyValidation.updateAcademicFacultyValidation),
  AcademicFacultyControllers.allAcademicFaculty,
);

export const AcademicFacultyRouter = router;
