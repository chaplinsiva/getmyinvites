import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      itemType,
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server missing RAZORPAY_KEY_SECRET" },
        { status: 500 }
      );
    }

    // Verify signature with HMAC SHA256
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isAuthentic = generatedSignature === razorpay_signature;

    if (!isAuthentic) {
      console.error("Razorpay signature verification failed!");
      return NextResponse.json(
        { success: false, error: "Payment verification failed: Signature mismatch" },
        { status: 400 }
      );
    }

    // Payment is authentic & verified! Update Supabase payments record if present
    try {
      const supabase = await createClient();
      await supabase
        .from("payments")
        .update({
          razorpay_payment_id,
          razorpay_signature,
          status: "captured",
          updated_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", razorpay_order_id);
    } catch (dbErr) {
      console.warn("Could not update payment status in Supabase:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      itemType,
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error during verification" },
      { status: 500 }
    );
  }
}
