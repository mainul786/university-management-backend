import { TStudent } from './Student.interface';
import { Student } from './Student.model';

const createStudent = async (payload: TStudent) => {
  const result = await Student.create(payload);
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudent,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
