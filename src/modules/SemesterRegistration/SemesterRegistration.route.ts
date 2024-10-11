import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { semesterRegistrationValidations } from './SemesterRegistration.validation';
import { semesterRegistrationControllers } from './SemesterRegistration.controller';
const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidation,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);
router.patch(
  '/:id, ',
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidation,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);
router.get('/:id', semesterRegistrationControllers.singleSemesterRegistration);
router.get('/', semesterRegistrationControllers.allSemesterRegistration);

export const SemesterRegistrationRoutes = router;
