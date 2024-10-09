const router = require("express").Router();
const crypto = require("crypto"); // Import crypto

// const router = express.Router(); // Create a new router

const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {
  const keySecret = process.env.RAZORPAY_API_SECRET;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");
  return sig;
};

// Create the /verify-order endpoint
router.post("/verify-order", async (req, res) => {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } = req.body; // Get the request body

    const signature = generatedSignature(orderId, razorpayPaymentId);

    if (signature !== razorpaySignature) {
      return res.status(400).json({
        message: "Payment verification failed",
        isOk: false,
      });
    }

    return res.status(200).json({
      message: "Payment verified successfully",
      isOk: true,
    });
  } catch (error) {
    console.error("Error during payment verification:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      isOk: false,
    });
  }
});

// Export the router
module.exports = router;
