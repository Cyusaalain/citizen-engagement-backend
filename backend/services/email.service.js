import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wizzyalain250@gmail.com',
    pass: 'tiry jlbo vxnp tlik',
  },
});

export const sendStatusEmail = async (to, complaint) => {
  const mailOptions = {
    from: '"Citizen Service" <ucalain250@gmail.com>',
    to,
    subject: `Complaint #${complaint.id} Status Updated`,
    text: `Hello,\n\nYour complaint (category: ${complaint.category}) is now marked as "${complaint.status}".\n\nResponse: ${complaint.response || 'No message yet'}\n\nThank you.`,
  };

  await transporter.sendMail(mailOptions);
};