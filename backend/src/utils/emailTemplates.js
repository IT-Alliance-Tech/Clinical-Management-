const bookingEmailTemplate = ({
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
      <p>Status: <b>Pending</b></p>
      <p>Our team will confirm it shortly.</p>
    `;
  }

  if (status === "Confirmed") {
    subject = "Appointment Confirmed";
    message = `
      <p>Your appointment has been <b>confirmed</b>.</p>
      <p>We look forward to seeing you.</p>
    `;
  }

  if (status === "Rescheduled") {
    subject = "Appointment Rescheduled";
    message = `
      <p>Your appointment has been <b>rescheduled</b>.</p>
      <p>Please find the updated details below.</p>
    `;
  }

  return {
    subject,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <p>Hi ${name},</p>

        ${message}

        <p><b>Department:</b> ${department}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>

        <br/>
        <p>Regards,<br/>Clinic Team</p>
      </div>
    `,
  };
};

module.exports = bookingEmailTemplate;
