import express from "express";
import pool from "../db"; // ✅ import the pool, not query

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY id ASC"); // ✅ use pool.query
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;
