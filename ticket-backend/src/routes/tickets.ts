// src/routes/tickets.ts
import express from "express";
import pool from "../db";

const router = express.Router();

// POST /api/tickets - create a new ticket
router.post("/", async (req, res) => {
  try {
    const {
      ticketCode,
      eventName,
      eventDate,
      eventTime,
      location,
      ticketType,
      seats,
      email,
      name
    } = req.body;

    // Validate required fields
    if (!ticketCode || !eventName || !ticketType || !seats || !email || !name) {
      return res.status(400).json({ error: "Missing required ticket information" });
    }

    await pool.query(
      `INSERT INTO tickets 
        (ticket_code, event_name, event_date, event_time, location, ticket_type, seats, email, name)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [ticketCode, eventName, eventDate, eventTime, location, ticketType, seats, email, name]
    );

    res.json({ success: true, ticketCode });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Failed to save ticket" });
  }
});

// GET /api/tickets?email=... - fetch tickets by email
router.get("/", async (req, res) => {
  const email = req.query.email as string;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const result = await pool.query(
      `SELECT 
        ticket_code AS "ticketCode",
        event_name AS "eventName",
        event_date AS "eventDate",
        event_time AS "eventTime",
        location,
        ticket_type AS "ticketType",
        seats,
        email,
        name
       FROM tickets
       WHERE email = $1
       ORDER BY ticket_code DESC`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No tickets found for this email" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

export default router;
