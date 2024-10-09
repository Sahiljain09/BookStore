import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/remove-book-from-favourite`,
      {},
      { headers }
    );
    alert(response.data.message);
  };
  return (
    <div className="bg-zinc-800 rounded-lg p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="">
          <div className="bg-zinc-900 flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl text-white font-semibold">
            {data.title}{" "}
          </h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">
            ₹ {data.price}
          </p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded-md border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
