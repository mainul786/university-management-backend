import { TLoginUser } from './Auth.interface';

const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;
  console.log(id, password);
};

export const LoginUserServices = {
  loginUser,
};
