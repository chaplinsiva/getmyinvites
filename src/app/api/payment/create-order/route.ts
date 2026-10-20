import { NextResponse } from "next/server";
import { getRazorpayClient } from "@/lib/razorpay";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itemType, itemTitle = "Wedding Invitation", invitationId } = body;

    // Define pricing in paise (1 INR = 100 paise)
    let amountInPaise: number;
    let description: string;

    if (itemType === "video") {
      amountInPaise = 99 * 100; // ₹99
      description = "GetMyInvites - 1080p Animated Video Render";
    } else {
      amountInPaise = 49 * 100; // ₹49
      description = "GetMyInvites - Ultra HD Watermark-Free Poster";
    }

    // Check if Razorpay keys are configured
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const isMock = !keyId || keyId.includes("YOUR_KEY_ID") || !process.env.RAZORPAY_KEY_SECRET;

    if (isMock) {
      return NextResponse.json(
        {
          error: "Razorpay keys not configured in .env.local",
          message: "Please add your Razorpay Key ID and Secret in .env.local to activate live payments.",
          notConfigured: true,
        },
        { status: 400 }
      );
    }

    const razorpay = getRazorpayClient();

    // Create an order in Razorpay
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        itemType,
        itemTitle,
        invitationId: invitationId || "draft",
      },
    };

    const order = await razorpay.orders.create(options);

    // Optionally record order creation in Supabase
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      await supabase.from("payments").insert({
        user_id: user?.id || null,
        razorpay_order_id: order.id,
        amount: amountInPaise,
        currency: "INR",
        status: "created",
        item_type: itemType,
        item_title: description,
        metadata: {
          notes: options.notes,
        },
      });
    } catch (dbErr) {
      // Continue even if database logging encounters schema mismatch
      console.warn("Could not log payment order to database:", dbErr);
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      description,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to initiate payment",
      },
      { status: 500 }
    );
  }
}
