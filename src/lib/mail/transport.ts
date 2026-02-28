import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter;

export const getMailer = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.zeptomail.com",
      port: 587,
      secure: false, 
      auth: {
        user: process.env.ZEPTO_SMTP_USER,
        pass: process.env.ZEPTO_SMTP_PASS,
      },
    });
  }

  return transporter;
};