import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, onIncrease, onDecrease, onRemove, onClose }) => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/my-order", { state: { cartItems } });
  };

  return (
    <div className="fixed top-15 right-0 w-80 h-4/5 bg-white shadow-2xl p-4 z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Order</h2>
        <button
          className="text-black font-bold text-xl cursor-pointer"
          onClick={onClose}
        >
          x
        </button>
      </div>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">Your cart is empty!</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-sm">{item.title}</h3>
              <p className="text-sm">${item.price}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => onDecrease(item.id)}
                  className="bg-red-200 px-2 rounded cursor-pointer"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onIncrease(item.id)}
                  className="bg-green-200 px-2 rounded cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-black font-bold text-xlcursor-pointer"
            >
              ×
            </button>
          </div>
        ))
      )}
      {/* Total & Checkout */}
      <div className="fixed bottom-0 right-0 w-80 bg-white shadow-inne border border-t-slate-400 border-l-black-400 p-2 rounded-sm">
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>
        <button
          className="mt-4 w-full bg-black text-white py-2 rounded-lg"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
