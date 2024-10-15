import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../AcadmicSemester/AcademicSemester.model';
import { TSemesterRegistration } from './SemesterRegistration.interface';
import { SemesterRegistration } from './SemisterRegistration.model';
import QueryBuilder from '../../queryBuilder/QueryBuilder';
import { RegistrationStatus } from './SemesterRegistration.constant';

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;

  //check if there any registered semester that is already 'UPCOMING' | 'ONGOING';
  const isThereAnyUpcomingOrOngoningSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
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
  console.log(result);
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
  console.log({ _id: id }, { payload });
  // already register or not
  const isSemesterRegistrationExists = await SemesterRegistration.findById({
    id,
  });
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, `This semester is not found!`);
  }

  //if the semester is ended, we will not  update

  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can't update semester course already ${currentSemesterStatus}`,
    );
  }

  // 'UPCOMING' ---> 'ONGOING' ---> 'ENDED'

  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can't update directly ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can't update directly ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationServies = {
  createSemesterRegistration,
  singleSemesterRegistration,
  allSemesterRegistration,
  updateSemesterRegistration,
};
