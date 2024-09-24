import express from 'express';
import { FacultyControllers } from './Faculty.controller';
import validateRequest from '../../middlware/validateRequest';
import { FacultyValidations } from './Faculty.validation';

const router = express.Router();

router.get('/', FacultyControllers.getAllFaculty);
router.get('/:facultyId', FacultyControllers.singleFaculty);
router.patch(
  '/:facultyId',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete('/:facultyId', FacultyControllers.deleteFaculty);

export const FacultyRouters = router;
