import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./Components/Product";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Product />} />
        <Route path="/clothes" element={<Product />} />
        <Route path="/electronics" element={<Product />} />
        <Route path="/furniture" element={<Product />} />
        <Route path="/toys" element={<Product />} />
        <Route path="/my-order" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
