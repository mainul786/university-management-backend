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

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentId = (await findLastStudentId()) || (0).toString();
  let increment = (Number(currentId) + 1).toString().padStart(4, '0');

  increment = `${payload.year}${payload.code}${increment}`;
  return increment;
};
