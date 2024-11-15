import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.SALT_ROUND,
  default_password: process.env.DEFAULT_PASS,
  jwt_accessSecret: process.env.ACCESS_SECRET,
  jwt_refreshSecret: process.env.REFRESH_SECRET,
  jwt_accessExpiresIn: process.env.ACCESS_EXPIRES_IN,
  jwt_refreshExpiresIn: process.env.REFRESH_EXPIRES_IN,
};
