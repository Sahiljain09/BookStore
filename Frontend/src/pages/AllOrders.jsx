import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  // const [reloadData, setReloadData] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-all-orders`,
        { headers }
      );
      setAllOrders(response.data.data);
      //   console.log(response.data.data);
    };
    fetch();
  }, [AllOrders]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/update-status/${id}`,
      Values,
      { headers }
    );
    alert(response.data.message);
    // console.log(response);
  };

  // const submitChanges = async (i) => {
  //   const id = AllOrders[i]._id;
  //   try {
  //     const response = await axios.put(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/v1/update-status/${id}`,
  //       Values,
  //       { headers }
  //     );

  //     // Update the order in the state using the returned updated order
  //     const updatedOrder = response.data.data;

  //     setAllOrders((prevOrders) => {
  //       const updatedOrders = [...prevOrders];
  //       updatedOrders[i] = updatedOrder; // Replace the updated order in the state
  //       return updatedOrders;
  //     });

  //     // Hide the options after updating the status
  //     setOptions(-1);

  //     alert(response.data.message);
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //     alert("An error occurred while updating status.");
  //   }
  // };

  AllOrders && AllOrders.splice(AllOrders.length - 1, 1);

  return (
    <>
      {!AllOrders && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {AllOrders && AllOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100 ">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[5%]">
              <h1 className="text-center">S.No.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1 className="">
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {AllOrders.map((items, i) => (
            <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300">
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1 className="">{items.book.desc.slice(0, 45)}...</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1 className="">₹ {items.book.price}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOptions(i)}
                  >
                    {items.status === "Order Placed" ? (
                      <div className="text-green-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : items.status === "Out for Delivery" ? (
                      <div className="text-cyan-400">{items.status}</div>
                    ) : (
                      <div className="text-yellow-500">{items.status}</div>
                    )}
                  </button>
                  <div
                    className={`${
                      Options === i ? "block" : "hidden"
                    } flex mt-4`}
                  >
                    <select
                      name="status"
                      id=""
                      className="bg-gray-800"
                      onChange={change}
                      value={Values.status}
                    >
                      {[
                        "Order Placed",
                        "Out for Delivery",
                        "Delivered",
                        "Canceled",
                      ].map((items, i) => (
                        <option value={items} key={i}>
                          {items}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setOptions(-1);
                        submitChanges(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%] ">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    // setuserDivData(items.user);
                    setuserDivData({
                      user: items.user,
                      orderCreatedAt: items.createdAt,
                    });
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
