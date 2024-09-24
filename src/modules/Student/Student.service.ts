import { startSession } from 'mongoose';
import { Student } from './Student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../User/User.model';
import { TStudent } from './Student.interface';
import QueryBuilder from '../../queryBuilder/QueryBuilder';
import { studentSearchAbleFields } from './Student.constant';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  //   const queryObj = { ...query };
  //   const studentSearchAbleFields = ['email', 'name.firtname', 'presentAddress'];

  //   let searchTerm = '';
  //   if (query?.searchTerm) {
  //     searchTerm = query?.searchTerm as string;
  //   }

  //   const searchQuery = Student.find({
  //     $or: studentSearchAbleFields.map((field) => ({
  //       [field]: { $regex: searchTerm, $options: 'i' },
  //     })),
  //   });

  //   // filtering
  //   const exclusiveFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  //   exclusiveFields.forEach((el) => delete queryObj[el]);

  //   console.log({query}, {queryObj})

  //   const filterQuery = searchQuery
  //     .find(queryObj)
  //     .populate('admissionSemester')
  //     .populate({
  //       path: 'academicDepartment',
  //       populate: {
  //         path: 'academicFaculty',
  //       },
  //     });

  //   let sort = 'createdAt';
  //   if (query.sort) {
  //     sort = query.sort as string;
  //   }

  //   const sortQuery = filterQuery.sort(sort);

  //   let limit = 1;
  //   let page = 1;
  //   let skip = 0;

  //   if (query.limit) {
  //     limit = Number(query.limit );
  //   }

  //   if(query.page){
  //     page = Number(query.page);
  //     skip = (page-1) * limit;
  //   }

  //   const paginateQuery = sortQuery.skip(skip)
  //   const limitQuery =  paginateQuery.limit(limit);

  // let fields = '-__v';
  // if(query.fields){
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const fieldsQuery = await limitQuery.select(fields)

  //   return fieldsQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  // console.log(id);
  // const result = await Student.aggregate([{ $match: { id } }]);
  // console.log(result);
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGrudian, ...remaningStudentData } = payload;

  //non-primitive value update code line no 32 theke line no. 52
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remaningStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGrudian && Object.keys(localGrudian).length) {
    for (const [key, value] of Object.entries(localGrudian)) {
      modifiedUpdatedData[`localGrudian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted student');
    }

    const userDeleted = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!userDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to user delete');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
