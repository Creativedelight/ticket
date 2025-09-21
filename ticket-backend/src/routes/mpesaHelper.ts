import axios from "axios";

const consumerKey = process.env.MPESA_CONSUMER_KEY!;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;

export async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  try {
    const res = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );
    return res.data.access_token;
  } catch (err) {
    console.error("Error fetching access token:", err);
    throw err;
  }
}

export async function stkPush(phone: string, amount: number) {
  const token = await getAccessToken();
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const shortcode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;
  const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: "https://218e0dc30255.ngrok-free.app/mpesa/callback/",
    AccountReference: "Ticket Purchase",
    TransactionDesc: "Payment for event ticket",
  };

  try {
    const res = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    // Axios error has a response object
    console.error("Error initiating STK push:", err.response?.data || err.message);
  } else if (err instanceof Error) {
    // General JS error
    console.error("Error initiating STK push:", err.message);
  } else {
    console.error("Error initiating STK push:", err);
  }
  throw err;
}

}
