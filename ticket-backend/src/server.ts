import "dotenv/config";
import express from "express";
import cors from "cors";

import ticketsRouter from "./routes/tickets";
import eventsRouter from "./routes/events";
import mpesaRouter from "./routes/mpesa"; // must be default export

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventsRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/mpesa", mpesaRouter);

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
