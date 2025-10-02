import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

export async function chargeMpesa(phone: string, amount: number, email: string) {
  try {
    const payload = {
      email,
      amount: amount * 100, // Paystack expects amount in kobo (smallest currency unit)
      currency: "KES",
      mobile_money: {
        phone,
        provider: "mpesa"
      }
    };

    const res = await axios.post("https://api.paystack.co/charge", payload, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      }
    });

    return res.data;
  } catch (err: any) {
    console.error("Paystack M-Pesa charge error:", err.response?.data || err.message);
    throw err;
  }
}
