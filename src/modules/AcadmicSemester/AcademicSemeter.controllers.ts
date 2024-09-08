import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './AcademicSemester.service';

const createAcdemicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemester Created successfully!',
    data: null,
  });
});

export const academicSemesterControllers = {
  createAcdemicSemester,
};
