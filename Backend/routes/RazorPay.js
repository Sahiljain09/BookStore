const router = require("express").Router();
const Razorpay = require("razorpay");

// const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // Use req.body to access the JSON data sent in the request
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
    });
    return res.json(order); // Send the order details as a JSON response
  } catch (error) {
    // console.error("Error creating Razorpay order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
