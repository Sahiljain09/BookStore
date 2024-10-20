const router = require("express").Router();
const {authenticateToken} = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

// Place order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      //saving Order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      //clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    return res.json({
      status: "Success",
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Get order history of particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const ordersData = userData.orders.reverse();
    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

// // Get all orders --admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Update order --admin
// router.put("/update-status/:id", authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Order.findByIdAndUpdate(id, { status: req.body.status });
//     return res.json({
//       status: "Success",
//       message: "Status Updated successfully",
//     });
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ message: "An error occurred" });
//   }
// });

// // Update order by GPT
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if status is provided and is not an empty string
    if (!status || typeof status !== "string" || status.trim() === "") {
      return res.status(400).json({
        status: "Error",
        message: "Invalid status. Status must be a non-empty string.",
      });
    }

    // Update the order status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: status.trim() }, // Ensure status is trimmed and valid
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({
        status: "Error",
        message: "Order not found.",
      });
    }

    return res.json({
      status: "Success",
      message: "Status updated successfully",
      data: updatedOrder, // Return the updated order in the response
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({
      status: "Error",
      message: "An error occurred while updating the status",
    });
  }
});


module.exports = router;
