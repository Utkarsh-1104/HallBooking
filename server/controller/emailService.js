import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER, 
    pass: process.env.BREVO_PASSWORD,
  },
});

// Function to send emails
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: '"LNCT Halls" <lncthalls@gmail.com>', // sender address
      to: to, // recipient
      subject: subject, // Subject line
      html: htmlContent, // HTML body
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;