import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = ({ setSelectedCategory, cartCount, onCartClick }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const tabs = ["All", "Clothes", "Electronics", "Furniture", "Toys"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleTabClick = (tab) => {
    setSelectedCategory(tab);
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow flex justify-between py-5 border border-gray-400 px-8">
      {/* Shopi and Tabs */}
      <div className="flex items-center gap-4">
        <button
          className="font-semibold text-xl cursor-pointer"
          onClick={() => {
            handleTabClick("All");
            navigate("/");
          }}
        >
          Shopi
        </button>

        {tabs.map((tab) => {
          const path = `/${tab.toLowerCase()}`;
          return (
            <button
              key={tab}
              onClick={() => {
                handleTabClick(tab);
                tab === "All" ? navigate("/") : navigate(path);
              }}
              className={`focus:outline-none ${
                activeTab === tab
                  ? "border-b-2 border-black"
                  : "text-gray-900 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* User Info and Cart */}
      <div className="flex items-center gap-4 text-sm">
        {/* if user is logged in then it will show email orders and cart and logout option  */}
        {user ? (
          <>
            <span className="text-gray-600">{user.email}</span>
            <Link to="/my-order">My Orders</Link>
            <button
              className="text-gray-600 hover:text-black"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          // otherwise it shows login and signup option
          <>
            <button
              className="text-gray-600 hover:text-black"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="text-gray-600 hover:text-black"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </>
        )}

        <div className="relative cursor-pointer" onClick={onCartClick}>
          <FaShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
