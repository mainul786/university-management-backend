import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourse } from './OfferedCourse.model';

const createOfferedCourseIntoDB = async (payload: string) => {
  const result = await OfferedCourse.create(payload);
  return result;
};

const findAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};

const findSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};
const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  findAllOfferedCourseFromDB,
  findSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
