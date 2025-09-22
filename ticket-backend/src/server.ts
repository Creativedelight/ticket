import "dotenv/config";
import express from "express";
import cors from "cors";

import ticketsRouter from "./routes/tickets";
import eventsRouter from "./routes/events";
import mpesaRouter from "./routes/mpesa";

const app = express();

// ✅ CORS: allow frontend domain
const allowedOrigins = [
  "https://ticket-eta-pied.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Preflight for all routes
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/events", eventsRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/mpesa", mpesaRouter);

app.get("/", (req, res) => res.send("Backend is running ✅"));

export default app;
