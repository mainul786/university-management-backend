import { AcademicSemester } from './AcademicSemester.model';
import { TAcademicSemester } from './AcademicSemeter.interface';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
