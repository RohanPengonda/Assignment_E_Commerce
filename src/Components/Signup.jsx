import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = (url) => {
    navigate(url);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border p-6 rounded w-80">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error &&
          alert("Already have an account or Enter Correct Details and Try ")}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block">Name:</label>
            <input type="text" className="w-full p-2 border rounded" required />
          </div>

          <div className="mb-4">
            <label className="block">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full  bg-green-900 text-white py-2 rounded cursor-pointer hover:bg-green-70"
          >
            Sign Up
          </button>
        </form>
        <button
          className="w-full p-2 cursor-pointer"
          onClick={() => handleLogin("/login")}
        >
          Already have an account?
        </button>
        <button
          className="w-full p-2 cursor-pointer"
          onClick={() => handleLogin("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Signup;
