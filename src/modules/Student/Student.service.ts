import { TStudent } from './Student.interface';
import { Student } from './Student.model';

const createStudent = async (payload: TStudent) => {
  const student = new Student(payload);
  if (await student.isUserExists(payload.id)) {
    throw new Error('User alredy exists');
  }
  const result = await Student.create(payload);
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudent,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
