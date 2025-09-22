// src/routes/tickets.ts
import express from "express";
import pool from "../db";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    ticketCode,
    eventName,
    eventDate,
    eventTime,
    location,
    ticketType,
    seats,
    email,
    name,
  } = req.body;

  if (!ticketCode || !eventName || !ticketType || !seats || !email || !name) {
    return res.status(400).json({ error: "Missing required ticket information" });
  }

  try {
    // 1️⃣ Save ticket in database
    await pool.query(
      `INSERT INTO tickets 
        (ticket_code, event_name, event_date, event_time, location, ticket_type, seats, email, name)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [ticketCode, eventName, eventDate, eventTime, location, ticketType, seats, email, name]
    );

    // 2️⃣ Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587, // 587 for STARTTLS, 465 for SSL
      secure: process.env.SMTP_PORT === "465", // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ Test SMTP connection
    await transporter.verify();

    // 3️⃣ Prepare ticket content
    const ticketContent = `
Ticket Code: ${ticketCode}
Event: ${eventName}
Date: ${eventDate} at ${eventTime}
Location: ${location}
Ticket: ${seats}x ${ticketType}

Buyer: ${name}, ${email}
`;

    // 4️⃣ Send ticket via email
    await transporter.sendMail({
      from: `"TicketMaster" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your Ticket for ${eventName}`,
      text: ticketContent,
    });

    res.json({ success: true, ticketCode });
  } catch (err: any) {
    console.error("Error saving ticket or sending email:", err.message || err);
    res.status(500).json({ error: "Failed to save ticket or send email" });
  }
});

export default router;
