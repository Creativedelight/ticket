import express from "express";
import { chargeMpesa } from "./paystackHelper";

const router = express.Router();

router.post("/mpesa", async (req, res) => {
  const { phone, amount, email } = req.body;
  try {
    const response = await chargeMpesa(phone, amount, email);
    res.json(response);
  } catch (err) {
    console.error("Error charging M-Pesa:", err);
    res.status(500).json({ error: "M-Pesa charge failed" });
  }
});

// Paystack webhook (callback)
router.post("/webhook", (req, res) => {
  console.log("Paystack Webhook received:", req.body);
  res.status(200).send("Received");
});

export default router;
