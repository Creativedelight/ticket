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
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/events", eventsRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/mpesa", mpesaRouter);

app.get("/", (req, res) => res.send("Backend is running ✅"));

export default app;
