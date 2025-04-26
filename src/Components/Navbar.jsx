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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow flex flex-wrap justify-between items-center py-5 border border-gray-400 px-4 sm:px-8">
      {/* Logo and Tabs */}
      <div className="flex items-center gap-4">
        {/* Hide Shopi Logo on small screens */}
        <button
          className="font-semibold text-xl cursor-pointer hidden sm:block"
          onClick={() => {
            handleTabClick("All");
            navigate("/");
          }}
        >
          Shopi
        </button>

        {/* Category Tabs (Always Visible) */}
        <div className="flex gap-2 sm:gap-4">
          {tabs.map((tab) => {
            const path = `/${tab.toLowerCase()}`;
            return (
              <button
                key={tab}
                onClick={() => {
                  handleTabClick(tab);
                  tab === "All" ? navigate("/") : navigate(path);
                }}
                className={`focus:outline-none text-sm sm:text-base ${
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
      </div>

      {/* User Info and Cart */}
      <div className="flex items-center gap-3 sm:gap-4 text-sm mt-3 sm:mt-0">
        {/* User logged in */}
        {user ? (
          <>
            <span className="hidden sm:inline text-gray-600">{user.email}</span>
            <Link to="/my-order" className="hover:underline">
              My Orders
            </Link>
            <button
              className="text-gray-600 hover:text-black"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          // User not logged in
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

        {/* Cart Icon */}
        <div className="relative cursor-pointer" onClick={onCartClick}>
          <FaShoppingCart size={22} />
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
