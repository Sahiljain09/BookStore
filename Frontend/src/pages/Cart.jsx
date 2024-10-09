import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // useEffect(() => {
  //   const fetch = async () => {
  //     const response = await axios.get(
  //       "${import.meta.env.VITE_BACKEND_URL}/api/v1/get-user-cart",
  //       { headers }
  //     );
  //     setCart(response.data.data);
  //     // console.log(response);
  //   };
  //   fetch();
  // }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-user-cart`,
          { headers }
        );
        setCart(response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        alert("Failed to fetch cart. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchCart();
  }, []);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
    // console.log(response);
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart]);

  const createOrder = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/create-order`,
        { amount: Total * 100 }
        // { headers: { "Content-Type": "application/json" } }
      );
      const data = res.data;

      const paymentData = {
        key: import.meta.env.REACT_APP_RAZORPAY_API_KEY,
        order_id: data.id,
        currency: "INR",
        name: "BookSpot", //your business name
        description: "Test Transaction",
        image:
          "https://i.pinimg.com/564x/11/53/18/115318a03dd409f995b46ac90d7cd75d.jpg",
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/verify-order`,
              {
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }
              // { headers: { "Content-Type": "application/json" } }
            );

            if (verifyRes.data.isOk) {
              const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/place-order`,
                { order: Cart },
                { headers }
              );
              alert("Payment Successful");
              // alert(response.data.message);
              navigate("/profile/orderHistory"); // Redirect on success
            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification failed. Please try again.");
          }
        },
      };

      const payment = new window.Razorpay(paymentData);
      payment.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  // const PlaceOrder = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/v1/place-order`,
  //       { order: Cart },
  //       { headers }
  //     );
  //     alert(response.data.message);
  //     navigate("/profile/orderHistory");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {!Cart && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <img
              src="/empty-cart.png"
              alt="empty cart"
              className="lg:h-[50vh]"
            />
          </div>
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {Cart.map((items, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={items.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {items.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {items.desc.slice(0, 65)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                  {items.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ₹ {items.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border boreder-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(items._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {Cart && Cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{Cart.length} books</h2>
              <h2>₹ {Total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-bold hover:bg-blue-500 hover:text-zinc-100 transition-all duration-300"
                // onClick={PlaceOrder}
                onClick={createOrder}
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
