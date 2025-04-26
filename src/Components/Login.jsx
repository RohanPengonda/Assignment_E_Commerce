import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = (url) => {
    navigate(url);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border p-6 rounded w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && alert("Enter Correct Details and Try ")}
        <form onSubmit={handleLogin}>
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
          {/* <div className="flex flex-col gap-2"> */}
          <button
            type="submit"
            className="w-full bg-green-900 text-white py-2 rounded cursor-pointer hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <button
          className="w-full p-2 cursor-pointer"
          onClick={() => handleSignIn("/signup")}
        >
          Create an account???{" "}
        </button>
        <button
          className="w-full p-2 cursor-pointer"
          onClick={() => handleSignIn("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Login;
