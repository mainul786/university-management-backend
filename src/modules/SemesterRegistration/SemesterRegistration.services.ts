import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../AcadmicSemester/AcademicSemester.model';
import { TSemesterRegistration } from './SemesterRegistration.interface';
import { SemesterRegistration } from './SemisterRegistration.model';
import QueryBuilder from '../../queryBuilder/QueryBuilder';

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;

  //check if there any registered semester that is already 'UPCOMING' | 'ONGOING';
  const isThereAnyUpcomingOrOngoningSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingOrOngoningSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `there is already a ${isThereAnyUpcomingOrOngoningSemester} register semester`,
    );
  }

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

const singleSemesterRegistration = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const allSemesterRegistration = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // already register or not
  const isSemesterRegistrationExists = await SemesterRegistration.findById({
    id,
  });
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, `This semester is not found!`);
  }

  //if the semester is ended, we will not  update

  const currentSemesterStaus = isSemesterRegistrationExists?.status;
  if (currentSemesterStaus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can't update semester course already ${currentSemesterStaus}`,
    );
  }
};

export const SemesterRegistrationServies = {
  createSemesterRegistration,
  singleSemesterRegistration,
  allSemesterRegistration,
  updateSemesterRegistration,
};
