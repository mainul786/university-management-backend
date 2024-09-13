//generate random id

import { TAcademicSemester } from '../AcadmicSemester/AcademicSemeter.interface';
import { User } from './User.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4); //2030

  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let increment = (Number(currentId) + 1).toString().padStart(4, '0');

  increment = `${payload.year}${payload.code}${increment}`;
  return increment;
};
