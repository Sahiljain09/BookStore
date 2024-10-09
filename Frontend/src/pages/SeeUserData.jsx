import React from "react";
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}
      ></div>
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}
      >
        <div className="bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] text-zinc-800">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button onClick={() => setuserDiv("hidden")}>
              <RxCross1 />
            </button>
          </div>
          <div className="mt-2">
            <label htmlFor="">
              Username:{" "}
              <span className="font-semibold">{userDivData.user.username}</span>
            </label>
          </div>
          <div className="mt-4">
            <label htmlFor="">
              Email: <span className="font-semibold">{userDivData.user.email}</span>
            </label>
          </div>
          <div className="mt-4">
            <label htmlFor="">
              Address:{" "}
              <span className="font-semibold">{userDivData.user.address}</span>
            </label>
          </div>
          <div className="mt-4">
            <label htmlFor="">
              Order Placed On:{" "}
              <span className="font-semibold">
              {formatDate(userDivData.orderCreatedAt)}
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
