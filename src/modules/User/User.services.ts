import config from '../../config';
import { TStudent } from '../Student/Student.interface';
import { newUser } from './User.interface';
import { User } from './User.model';

const createStudentFromDB = async (password: string, studentData: TStudent) => {
  // create a object
  const user: newUser = {};
  // set roll
  user.role = 'student';

  //   password set
  user.password = password || (config.default_password as string);

  //   set id
  user.id = '203010001';

  const result = await User.create(user);
  if (Object.keys(result)) {
    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};

export const UserServices = {
  createStudentFromDB,
};
