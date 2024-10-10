import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServies } from './SemesterRegistration.services';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServies.createSemesterRegistration(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create semester registration successfully ',
    data: result,
  });
});
const allSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServies.allSemesterRegistration();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' get all semester successfully ',
    data: result,
  });
});
const singleSemesterRegistration = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await SemesterRegistrationServies.singleSemesterRegistration(semesterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single semester successfully ',
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const { semester } = req.body;

  const result = await SemesterRegistrationServies.updateSemesterRegistration(
    semesterId,
    semester,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update semester registration successfully ',
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  allSemesterRegistration,
  singleSemesterRegistration,
  updateSemesterRegistration,
};
