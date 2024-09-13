import { academicSemestercodeNameMapper } from './AcademicSemester.constant';
import { AcademicSemester } from './AcademicSemester.model';
import { TAcademicSemester } from './AcademicSemeter.interface';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemestercodeNameMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const singleAcademicSemesterIntoDB = async (id: string) => {
  const result = await AcademicSemester.findById({ _id: id });
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterIntoDB,
  singleAcademicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
};
