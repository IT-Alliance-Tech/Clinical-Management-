const nodemailer = require("nodemailer");

module.exports = async ({
  to,
  name,
  department,
  date,
  time,
  status,
}) => {
  let subject = "";
  let message = "";

  if (status === "Pending") {
    subject = "Appointment Booked – Pending Confirmation";
    message = `
      <p>Your appointment has been <b>successfully booked</b>.</p>
      <p><b>Status:</b> Pending</p>
      <p>Our team will confirm your appointment shortly.</p>
    `;
  }

  if (status === "Confirmed") {
    subject = "Appointment Confirmed";
    message = `
      <p>Your appointment has been <b>confirmed</b>.</p>
    `;
  }

  if (status === "Cancelled") {
    subject = "Appointment Cancelled";
    message = `
      <p>Your appointment has been <b>cancelled</b>.</p>
    `;
  }

  if (status === "Rescheduled") {
    subject = "Appointment Rescheduled";
    message = `
      <p>Your appointment has been <b>rescheduled</b>.</p>
    `;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6">
      <h2>Hi ${name},</h2>
      ${message}
      <p><b>Department:</b> ${department}</p>
      <p><b>Date:</b> ${date}</p>
      <p><b>Time:</b> ${time}</p>
      <br/>
      <p>Regards,</p>
      <p><b>Clinic Management Team</b></p>
    </div>
  `;

  // ✅ SMTP Transport using ENV
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for others
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // ✅ Send Email
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
};
