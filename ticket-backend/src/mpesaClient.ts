import axios from "axios";

const mode = process.env.MPESA_MODE || "sandbox";

const SHORTCODE = mode === "production"
  ? process.env.MPESA_SHORTCODE_PROD!
  : process.env.MPESA_SHORTCODE_SANDBOX!;

const PASSKEY = mode === "production"
  ? process.env.MPESA_PASSKEY_PROD!
  : process.env.MPESA_PASSKEY_SANDBOX!;

const CONSUMER_KEY = mode === "production"
  ? process.env.MPESA_CONSUMER_KEY_PROD!
  : process.env.MPESA_CONSUMER_KEY_SANDBOX!;

const CONSUMER_SECRET = mode === "production"
  ? process.env.MPESA_CONSUMER_SECRET_PROD!
  : process.env.MPESA_CONSUMER_SECRET_SANDBOX!;

// Get access token
export async function getAccessToken() {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  const url =
    mode === "production"
      ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
      : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  try {
    const res = await axios.get(url, { headers: { Authorization: `Basic ${auth}` } });
    return res.data.access_token;
  } catch (err) {
    console.error("Error fetching access token:", err);
    throw err;
  }
}

// STK Push
export async function stkPush(phone: string, amount: number) {
  const token = await getAccessToken();
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const password = Buffer.from(SHORTCODE + PASSKEY + timestamp).toString("base64");

  const payload = {
    BusinessShortCode: SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: "Ticket Purchase",
    TransactionDesc: "Payment for event ticket",
  };

  try {
    const res = await axios.post(
      mode === "production"
        ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err: any) {
    console.error("Error initiating STK push:", err.response?.data || err);
    throw err;
  }
}
