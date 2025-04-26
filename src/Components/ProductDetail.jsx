import React from "react";

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;
  // console.log("Product Details:-", product);

  return (
    // Shows Product Details
    <div className=" border fixed top-20 right-0 h-full w-80 bg-white shadow-lg p-6 z-50 rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Detail</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          ✖
        </button>
      </div>
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full mb-4 rounded"
      />
      <p className="text-center text-lg font-bold">${product.price}</p>
      <p className="text-center font-semibold mt-2">{product.title}</p>
      <p className="text-sm text-gray-600 mt-2">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
