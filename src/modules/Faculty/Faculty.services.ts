import { TFaculty } from './Faculty.interface';
import { Faculty } from './Faculty.model';

const getAllFacultyFromDB = async () => {
  const result = await Faculty.find();
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id });
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const result = await Faculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const result = await Faculty.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
