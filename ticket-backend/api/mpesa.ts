import express from "express";
import { stkPush } from "./mpesaHelper";

const router = express.Router();

router.post("/stkpush", async (req, res) => {
  const { phone, amount } = req.body;
  try {
    const response = await stkPush(phone, amount);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "STK Push failed" });
  }
});

// callback endpoint
router.post("/callback", (req, res) => {
  console.log("MPESA Callback received:", req.body);
  res.status(200).send("Received");
});

export default router;
