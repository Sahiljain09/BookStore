// const http = require("http")
// const app = http.createServer();

const express = require("express")
const app = express();
const cors = require("cors");
app.use(express.json());
require("dotenv").config();
require('./conn/conn');
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
const CreateOrder = require("./routes/RazorPay")
const paymentRoutes = require("./routes/paymentRoutes")

const port = process.env.PORT || 3000;  

app.use(cors());
// routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);
app.use("/api/v1", CreateOrder);
app.use("/api/v1", paymentRoutes);

app.get("/", (req, res) => {
        res.send("Hello from Backend side")
    })

// creating Port
app.listen(port, ()=> {
    console.log(`Server Started at port: ${port}`)
})