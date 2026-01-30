import nodemailer from 'nodemailer';

async function sendMail(email, emailtype, user) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // Use true for port 465, false for port 587
      auth: {
        user: 'maddison53@ethereal.email',
        pass: 'jn7jnAPss4f63QBp6D',
      },
    });

    const nodemailerResponse = await transporter.sendMail({
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
