import config from '../../config';
import { AcademicSemester } from '../AcadmicSemester/AcademicSemester.model';
import { TStudent } from '../Student/Student.interface';
import { Student } from '../Student/Student.model';
import { TUser } from './User.interface';
import { User } from './User.model';
import { generateStudentId } from './User.utils';

const createStudentFromDB = async (password: string, payload: TStudent) => {
  // create a object
  const userData: Partial<TUser> = {};
  // set roll
  userData.role = 'student';

  //   password set
  userData.password = password || (config.default_password as string);

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // default  set id
  // userData.id = '203010001';

  userData.id = await generateStudentId(admissionSemester);

  const newUser = await User.create(userData);

  if (Object.keys(newUser)) {
    payload.id = newUser.id;
    payload.user = newUser._id;
  }

  const result = await Student.create(payload);
  return result;
};

export const UserServices = {
  createStudentFromDB,
};
