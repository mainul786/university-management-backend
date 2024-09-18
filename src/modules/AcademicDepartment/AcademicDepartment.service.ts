import { TAcademicDepartment } from './AcademicDepartment.interface';
import { AcademicDepartment } from './AcademicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDeparmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id }).populate(
    'academicFaculty',
  );
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDeparmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
