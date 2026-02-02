import { User } from '@/models/user.models';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

async function sendMail(email, emailtype, useriD) {
  try {
    if (emailtype === 'VERIFY') {
      // Logic for verification email can be added here
      const verifyToken = await bcrypt.hash(useriD.toString(), 10);
      await User.findByIdAndUpdate(useriD, {
        verifyToken: verifyToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    } else {
      // Logic for password reset email can be added here
      const resetToken = await bcrypt.hash(useriD.toString(), 10);
      await User.findByIdAndUpdate(useriD, {
        ForgetPasswordToken: resetToken,
        ForgetPasswordTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
    const nodemailerResponse = await transport.sendMail({
      from: 'saqibkhatai@gmail.com', // sender address
      to: 'saqibkhatai@gmail.com',
      subject: 'Hello ✔',
      html: '<b>Hello world?</b>', // HTML version of the message
    });

    console.log('Message sent: %s', nodemailerResponse);

    return nodemailerResponse;
  } catch (error) {
    console.log('Error sending email:', error);
  }
}

export default sendMail;
