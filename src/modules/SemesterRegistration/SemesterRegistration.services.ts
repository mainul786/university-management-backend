import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../AcadmicSemester/AcademicSemester.model';
import { TSemesterRegistration } from './SemesterRegistration.interface';
import { SemesterRegistration } from './SemisterRegistration.model';

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;

  //check if the semester is exists
  const isSemesterRegistrationExists =
    await AcademicSemester.findById(academicSemester);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'acedmic semester already register',
    );
  }
  // check if the semester is already is exists
  const isSemesterRegistrationAlreadyExists =
    await SemesterRegistration.findOne({ academicSemester });
  // console.log(isSemesterRegistrationAlreadyExists, 'database kichu nai');
  if (isSemesterRegistrationAlreadyExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'acedmic semester already register',
    );
  }

  const result = SemesterRegistration.create(payload);
  return result;
};

const singleSemesterRegistration = async (id: string) => {};
const allSemesterRegistration = async () => {};
const updateSemesterRegistration = async (
  is: string,
  payload: Partial<TSemesterRegistration>,
) => {};

export const SemesterRegistrationServies = {
  createSemesterRegistration,
  singleSemesterRegistration,
  allSemesterRegistration,
  updateSemesterRegistration,
};
