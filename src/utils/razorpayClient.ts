/**
 * Client-side Razorpay Checkout Loader and Trigger Helper
 */

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface InitiatePaymentParams {
  itemType: "poster" | "video";
  itemTitle?: string;
  invitationId?: string;
  userEmail?: string;
  userName?: string;
  userContact?: string;
  preferredMethod?: "upi" | "card";
  onSuccess: (result: { orderId: string; paymentId: string; itemType: string }) => void;
  onError?: (errorMessage: string) => void;
  onDismiss?: () => void;
}

export async function initiateRazorpayPayment(params: InitiatePaymentParams): Promise<void> {
  const {
    itemType,
    itemTitle,
    invitationId,
    userEmail = "",
    userName = "",
    userContact = "",
    preferredMethod,
    onSuccess,
    onError,
    onDismiss,
  } = params;

  try {
    // 1. Create order on server
    const orderRes = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemType, itemTitle, invitationId }),
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok || !orderData.success) {
      if (orderData.notConfigured) {
        const errorMsg =
          "Razorpay API Keys are not yet entered in .env.local.\n\n" +
          "Please add NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local to complete real payments.";
        onError ? onError(errorMsg) : alert(errorMsg);
        return;
      }
      throw new Error(orderData.error || "Failed to create payment order");
    }

    // 2. Ensure checkout script is loaded
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || !(window as any).Razorpay) {
      throw new Error("Unable to load Razorpay checkout SDK. Please check your internet connection.");
    }

    // 3. Configure Razorpay options
    const options: any = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency || "INR",
      name: "GetMyInvites",
      description: orderData.description || (itemType === "video" ? "1080p Video Invitation" : "Ultra HD Poster"),
      image: "/logos/LogoWithName.png",
      order_id: orderData.orderId,
      handler: async function (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) {
        try {
          // 4. Verify signature on backend
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              itemType,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            onSuccess({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              itemType,
            });
          } else {
            throw new Error(verifyData.error || "Payment verification failed");
          }
        } catch (verErr: any) {
          console.error("Verification error:", verErr);
          onError
            ? onError(verErr.message || "Failed to verify transaction")
            : alert(verErr.message || "Verification failed");
        }
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: userContact,
      },
      theme: {
        color: "#6D214F", // Royal Burgundy
      },
      modal: {
        ondismiss: function () {
          onDismiss?.();
        },
      },
    };

    // If user clicked UPI specifically, we can hint it to Razorpay
    if (preferredMethod === "upi") {
      options.config = {
        display: {
          blocks: {
            banks: {
              name: "Pay using UPI",
              instruments: [{ method: "upi" }],
            },
          },
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: true,
          },
        },
      };
    }

    const rzp = new (window as any).Razorpay(options);

    rzp.on("payment.failed", function (response: any) {
      console.error("Payment failed:", response.error);
      onError
        ? onError(response.error.description || "Payment failed or cancelled")
        : alert(`Payment failed: ${response.error.description || "Transaction cancelled"}`);
    });

    rzp.open();
  } catch (err: any) {
    console.error("Initiate payment error:", err);
    onError ? onError(err.message || "Something went wrong") : alert(err.message || "Payment initiation error");
  }
}
