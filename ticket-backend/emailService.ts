import nodemailer from "nodemailer";

export async function sendTicketEmail(to: string, subject: string, text: string, attachmentPath?: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true for 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions: any = {
    from: `"Event Tickets" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  };

  if (attachmentPath) {
    mailOptions.attachments = [
      {
        filename: attachmentPath.split("/").pop(),
        path: attachmentPath,
      },
    ];
  }

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent: ", info.messageId);
}
