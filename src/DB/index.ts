import config from '../config';
import { USERROLE } from '../modules/User/User.constant';
import { User } from '../modules/User/User.model';

const superUser = {
  id: '0001',
  email: 'mdmainulislam320@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USERROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExists = await User.findOne({ role: USERROLE.superAdmin });
  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
