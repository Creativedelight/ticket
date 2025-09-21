import express from "express";
const router = express.Router();

router.post("/callback", (req, res) => {
  console.log("Daraja callback received:", req.body);

  const { Body } = req.body;
  if (Body && Body.stkCallback) {
    const resultCode = Body.stkCallback.ResultCode;
    const resultDesc = Body.stkCallback.ResultDesc;

    // Payment successful
    if (resultCode === 0) {
      const mpesaReceipt = Body.stkCallback.CallbackMetadata.Item.find(
        (i: any) => i.Name === "MpesaReceiptNumber"
      ).Value;

      const amount = Body.stkCallback.CallbackMetadata.Item.find(
        (i: any) => i.Name === "Amount"
      ).Value;

      const phone = Body.stkCallback.CallbackMetadata.Item.find(
        (i: any) => i.Name === "PhoneNumber"
      ).Value;

      console.log(`Payment success! Receipt: ${mpesaReceipt}, Amount: ${amount}, Phone: ${phone}`);

      // TODO: Save ticket to DB here
    } else {
      console.log(`Payment failed: ${resultDesc}`);
    }
  }

  res.status(200).send("Received");
});

export default router;
