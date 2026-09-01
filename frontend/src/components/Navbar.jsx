import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import { useState, useEffect, useRef } from "react";
import { Heart, ShoppingCart } from "lucide-react";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const dropdownRef = useRef(null);

  // ==========================================
  // LOGOUT
  // ==========================================

  // const handleLogout = async () => {
  //   try {
  //     await api.post("/logout");

  //     setUser(null);

  //     setShowMenu(false);

  //     navigate("/signin");
  //   } catch (err) {
  //     console.log("Logout error:", err);
  //   }
  // };

  const handleLogout=async()=>{
    try{
      await api.post("/logout")

      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");

      setUser(null)
      setShowMenu(false)
      navigate("/signin")
    }catch(err){
      console.log(err);

      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      setUser(null);
      navigate("/signin");
      
    }
  }

  // ==========================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ==========================================
  // PROFILE IMAGE
  // Supports:
  //
  // 1. profileImage: "https://..."
  //
  // 2. profileImage: {
  //      url: "https://...",
  //      public_id: "..."
  //    }
  // ==========================================
// ==========================================
// PROFILE IMAGE URL
// Supports Cloudinary + old local uploads
// ==========================================

const getProfileImage = (profileImage) => {
  if (!profileImage) {
    return "/default-avatar.png";
  }

  // Cloudinary object
  if (
    typeof profileImage === "object" &&
    profileImage?.url
  ) {
    return profileImage.url;
  }

  // Old/local image
  if (typeof profileImage === "string") {
    if (profileImage.startsWith("/uploads")) {
      return `http://localhost:5200${profileImage}`;
    }

    return profileImage;
  }

  return "/default-avatar.png";
};





  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-[#213555]/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* ==========================================
              LOGO
          ========================================== */}

          <div className="-translate-x-35">
            <Link
              to="/"
              className="text-3xl font-bold text-[#F5EFE7]"
            >
              Rentora
            </Link>
          </div>

          {/* ==========================================
              CENTER MENU
          ========================================== */}

          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/home"
              className="text-[#F5EFE7] hover:text-[#D8C4B6] transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-[#F5EFE7] hover:text-[#D8C4B6] transition"
            >
              Products
            </Link>

            <Link
              to="/category"
              className="text-[#F5EFE7] hover:text-[#D8C4B6] transition"
            >
              Categories
            </Link>

            <Link
              to="/aboutus"
              className="text-[#F5EFE7] hover:text-[#D8C4B6] transition"
            >
              About
            </Link>

            <Link
              to="/contactus"
              className="text-[#F5EFE7] hover:text-[#D8C4B6] transition"
            >
              Contact
            </Link>

          </div>

          {/* ==========================================
              RIGHT SECTION
          ========================================== */}

          <div className="flex items-center gap-6 translate-x-35">

            {/* ==========================================
                CART
            ========================================== */}

            <Link
              to="/cart"
              className="flex flex-col items-center justify-center text-[#F5EFE7] hover:text-[#D8C4B6] transition"
            >
              <ShoppingCart size={20} />

              <span className="text-xs mt-1">
                Cart
              </span>
            </Link>

            {/* ==========================================
                WISHLIST
            ========================================== */}

            <Link
              to="/wishlist"
              className="flex flex-col items-center justify-center text-[#F5EFE7] hover:text-[#D8C4B6] transition"
            >
              <Heart size={20} />

              <span className="text-xs mt-1">
                Wishlist
              </span>
            </Link>

            {/* ==========================================
                USER LOGGED IN
            ========================================== */}

            {user ? (

              <div
                className="relative ml-2"
                ref={dropdownRef}
              >

                {/* PROFILE BUTTON */}

                <button
                  type="button"
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="flex items-center gap-3 bg-[#3E5879] px-4 py-2 rounded-lg text-[#F5EFE7] hover:bg-[#2e4561] transition"
                >

                  {/* PROFILE IMAGE */}
<div className="navbar-profile-wrapper">
  {user?.profileImage?.url ||
  (typeof user?.profileImage === "string" && user.profileImage) ? (
    <img
      src={
        user?.profileImage?.url ||
        user?.profileImage
      }
      alt={user?.name || "User"}
      className="navbar-profile-img"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  ) : (
    <div className="navbar-profile-placeholder">
      {user?.name?.charAt(0)?.toUpperCase() || "U"}
    </div>
  )}
</div>

                  {/* USERNAME */}

                  <div className="text-left hidden sm:block">

                    <p className="font-semibold">
                      {user?.email
                        ? user.email.split("@")[0]
                        : "User"}
                    </p>

                  </div>

                  {/* ARROW */}

                  <span
                    className={`transition-transform duration-200 ${
                      showMenu ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>

                </button>

                {/* ==========================================
                    DROPDOWN MENU
                ========================================== */}

                {showMenu && (

                  <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">

                    {/* MY PROFILE */}

                    <Link
                      to="/profile"
                      onClick={() => setShowMenu(false)}
                      className="block px-5 py-3 hover:bg-gray-100 transition"
                    >
                      👤 My Profile
                    </Link>

                    {/* MY RENTALS */}

                    <Link
                      to="/myrentals"
                      onClick={() => setShowMenu(false)}
                      className="block px-5 py-3 hover:bg-gray-100 transition"
                    >
                      📦 My Rentals
                    </Link>

                    {/* RENTAL HISTORY */}

                    <Link
                      to="/rentalhistory"
                      onClick={() => setShowMenu(false)}
                      className="block px-5 py-3 hover:bg-gray-100 transition"
                    >
                      🕒 Rental History
                    </Link>

                    {/* SETTINGS */}

                    <Link
                      to="/settings"
                      onClick={() => setShowMenu(false)}
                      className="block px-5 py-3 hover:bg-gray-100 transition"
                    >
                      ⚙️ Settings
                    </Link>

                    {/* LOGOUT */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
                    >
                      🚪 Logout
                    </button>

                  </div>

                )}

              </div>

            ) : (

              /* ==========================================
                 USER NOT LOGGED IN
              ========================================== */

              <div className="flex items-center gap-4 ml-2">

                <Link
                  to="/signin"
                  className="px-5 py-2 border border-[#D8C4B6] rounded-lg text-[#F5EFE7] hover:bg-[#D8C4B6] hover:text-[#213555] transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 bg-[#3E5879] rounded-lg text-[#F5EFE7] hover:bg-[#D8C4B6] hover:text-[#213555] transition"
                >
                  Sign Up
                </Link>

              </div>

            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;