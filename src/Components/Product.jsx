import { React, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Navbar from "./Navbar";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Login from "./Login";

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category.name === selectedCategory);
  // console.log("cat:", selectedCategory);

  const handleAddToCart = (product) => {
    setIsCartOpen(true);
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {/* <Login /> */}
      <Navbar
        setSelectedCategory={setSelectedCategory}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      {/* section Home and search bar */}
      <div className="flex flex-col pt-20 items-center">
        <h1 className="flex items-center justify-center relative w-80 mb-4">
          Home
        </h1>
        <input
          type="text"
          className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
          name=""
          placeholder="Search a Product"
        />

        <div className="rounded grid place-items-center xl:gap-4 md:gap-4 sm:gap-2 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full max-w-screen-lg m ">
          {/* loaded all products from API and displayed it and according to category also  */}
          {filtered.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer relative rounded p-1"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-4/5"
              />
              <div className="absolute bottom-11 left-2 mx-1 bg-white text-sm rounded opacity-70 p-1">
                {product.category.name}
              </div>
              <button
                className="absolute top-2.5 right-2.5 bg-white text-black p-2 px-2 rounded-full"
                onClick={() => {
                  handleAddToCart(product);
                }}
              >
                <FaPlus className="cursor-pointer" size={12} />
              </button>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-800 ">{product.title}</p>
                <span className="text-md font-bold">{product.price}$</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* if user clicks on product it shows Product details only  */}
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* if user adds product in cart then cart component will open  */}
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </>
  );
};

export default Product;
