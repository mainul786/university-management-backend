import config from '../../config';
import { TStudent } from '../Student/Student.interface';
import { Student } from '../Student/Student.model';
import { TUser } from './User.interface';
import { User } from './User.model';

const createStudentFromDB = async (password: string, studentData: TStudent) => {
  // create a object
  const userData: Partial<TUser> = {};
  // set roll
  userData.role = 'student';

  //   password set
  userData.password = password || (config.default_password as string);

  //   set id
  userData.id = '203010001';

  const newUser = await User.create(userData);

  if (Object.keys(newUser)) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
  }

  const result = await Student.create(studentData);
  console.log(result);
  return result;
};

export const UserServices = {
  createStudentFromDB,
};
