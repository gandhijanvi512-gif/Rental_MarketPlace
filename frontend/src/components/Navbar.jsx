import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Navbar = ({user, setUser}) => {
  const navigate=useNavigate()

  const [showMenu,setShowMenu]=useState(false)

  const dropdownRef=useRef(null)


  const handleLogout=async()=>{
    try{
      await api.post("/logout");
      setUser(null);

      navigate("/signin")
    }catch(err){
      console.log(err);
      
    }
  }

  useEffect(()=>{
    const handleClickOutside=(event)=>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setShowMenu(false)
      }

      document.addEventListener("mousedown",handleClickOutside);

      return()=>{
        document.removeEventListener("mousedown",handleClickOutside)
      }
    }
  },[])

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-[#213555]/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div>
            <Link
              to="/"
              className="text-3xl font-bold text-[#F5EFE7]"
            >
              RentEase
            </Link>
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/home" className="text-[#F5EFE7] hover:text-[#D8C4B6]">
              Home
            </Link>

            <Link to="/products" className="text-[#F5EFE7] hover:text-[#D8C4B6]">
              Products
            </Link>

            <Link to="/category" className="text-[#F5EFE7] hover:text-[#D8C4B6]">
              Categories
            </Link>

            <Link to="/about" className="text-[#F5EFE7] hover:text-[#D8C4B6]">
              About
            </Link>

            <Link to="/contact" className="text-[#F5EFE7] hover:text-[#D8C4B6]">
              Contact
            </Link>
          </div>

          {/* Buttons */}
<div className="flex items-center gap-4">

    {user ? (

        <div
            className="relative"
            ref={dropdownRef}
        >

            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3 bg-[#3E5879] px-4 py-2 rounded-lg text-[#F5EFE7] hover:bg-[#2e4561] transition"
            >

                <div className="w-10 h-10 rounded-full bg-[#D8C4B6] text-[#213555] flex items-center justify-center font-bold">

                    {user.email.charAt(0).toUpperCase()}

                </div>

                <div className="text-left">

                    <p className="font-semibold">

                        {user.email.split("@")[0]}

                    </p>

                </div>

                <span>▼</span>

            </button>

            {showMenu && (

                <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl overflow-hidden border">

                    <Link
                        to="/profile"
                        onClick={() => setShowMenu(false)}
                        className="block px-5 py-3 hover:bg-gray-100"
                    >
                        👤 My Profile
                    </Link>

                    <Link
                        to="/myrentals"
                        onClick={() => setShowMenu(false)}
                        className="block px-5 py-3 hover:bg-gray-100"
                    >
                        📦 My Rentals
                    </Link>

                    <Link
                        to="/rentalhistory"
                        onClick={() => setShowMenu(false)}
                        className="block px-5 py-3 hover:bg-gray-100"
                    >
                        🕒 Rental History
                    </Link>

                    <Link
                        to="/settings"
                        onClick={() => setShowMenu(false)}
                        className="block px-5 py-3 hover:bg-gray-100"
                    >
                        ⚙️ Settings
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
                    >
                        🚪 Logout
                    </button>

                </div>

            )}

        </div>

    ) : (

        <>

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

        </>

    )}

</div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;