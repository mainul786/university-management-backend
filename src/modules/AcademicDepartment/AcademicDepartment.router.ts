import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { AcademicDepartmentValidations } from './AcademicDepartment.validation';
import { AcademicDepartmentControllers } from './AcademicDepartment.controller';
const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentValidations.createAcademicDepartment),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:departmentId',
  validateRequest(AcademicDepartmentValidations.updateAcademicDepartment),
  AcademicDepartmentControllers.updateAcademicDepartment,
);
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

export const AcademicDepartmentRouter = router;
