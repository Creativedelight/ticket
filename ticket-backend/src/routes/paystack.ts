import express from "express";
import { chargeMpesa, verifyTransaction } from "./paystackHelper";

const router = express.Router();

// M-Pesa charge
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

// ✅ Paystack transaction verification
router.get("/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;
    const data = await verifyTransaction(reference);
    res.json(data); // always return JSON
  } catch (err: any) {
    console.error("Error verifying transaction:", err.response?.data || err.message);
    res.status(400).json({ error: "Verification failed" });
  }
});

// Webhook
router.post("/webhook", (req, res) => {
  console.log("Paystack Webhook received:", req.body);
  res.status(200).send("Received");
});

export default router;
