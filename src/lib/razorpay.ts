import Razorpay from "razorpay";

export function getRazorpayClient() {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret || key_id.includes("YOUR_KEY_ID") || key_secret.includes("YOUR_RAZORPAY_KEY_SECRET")) {
    throw new Error(
      "Razorpay API keys are not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local"
    );
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
}
