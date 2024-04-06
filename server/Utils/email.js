import nodemailer from 'nodemailer';

export const sendEmail = async options => {
  // 1) Create a transporter
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "singh.shreya0511@gmail.com",
        pass: "cxibqmpoejcoyfho"
    }
});

  const mailOptions = {
    from: "singh.shreya0511@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

