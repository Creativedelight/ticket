// server.ts
import "dotenv/config";
import express from "express";
import cors from "cors";

import ticketsRouter from "./routes/tickets";
import eventsRouter from "./routes/events";
import mpesaRouter from "./routes/mpesa";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ticket-eta-pied.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.use(express.json());

app.use("/api/events", eventsRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/mpesa", mpesaRouter);

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ✅ Export app instead of app.listen
export default app;
