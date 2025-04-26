import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="relative p-6">
      {/* Back Button in the upper left corner */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-gray-950 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        <IoMdArrowRoundBack />
      </button>

      <h1 className="text-2xl font-bold text-center mb-6">My Orders</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">No items to checkout.</p>
      ) : (
        <div className=" p-2 rounded flex flex-col items-center gap-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col h-full w-100 items-center justify-center p-4 rounded shadow border border-gray-400 gap-2"
            >
              <div className="flex items-center gap-2">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="font-normal">{item.title}</h2>
                  <p className="font-semibold">${item.price}</p>
                </div>
              </div>
              {/* <p className="font-bold">${item.price * item.quantity}</p> */}
            </div>
          ))}
          <div className="text-right text-xl font-bold mt-6 underline">
            Total: ${totalPrice}
          </div>
        </div>
      )}

      <div className="flex items-center justify-center font-semibold text-2xl text-center p-2">
        ✅ Order Placed
      </div>
    </div>
  );
};

export default Checkout;
