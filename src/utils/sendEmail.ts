import nodemailer from 'nodemailer';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'mdmainulislam320@gmail.com',
      pass: 'jdtf wdzr mlvy sejl',
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'mdmainulislam320@gmail.com', // sender address
    to, // list of receivers
    subject: 'Password Reset ✔', // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  });
};
