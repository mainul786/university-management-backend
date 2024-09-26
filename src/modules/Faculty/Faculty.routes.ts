import express from 'express';
import { FacultyControllers } from './Faculty.controller';
import validateRequest from '../../middlware/validateRequest';
import { FacultyValidations } from './Faculty.validation';

const router = express.Router();

router.get('/', FacultyControllers.getAllFaculty);
router.get('/:id', FacultyControllers.singleFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete('/:id', FacultyControllers.deleteFaculty);

export const FacultyRouters = router;
