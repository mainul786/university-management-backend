import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import config from '../config';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret, // Click 'View API Keys' above to copy your API secret
});

export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    // Upload an image
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName,
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        //delete a file asynchronously
        fs.unlink(path, (error) => {
          if (error) {
            console.error('An error occured', error);
          } else {
            console.log('File deleted successfully!');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
