import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

const Navbar = ({user, setUser}) => {
  const navigate=useNavigate()


  const handleLogout=async()=>{
    try{
      await api.post("/logout");
      setUser(null);

      navigate("/signin")
    }catch(err){
      console.log(err);
      
    }
  }

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
              <>
                <span className="text-[#F5EFE7] font-medium">
                  {user.email}
                </span>

                <button onClick={handleLogout} className="px-5 py-2 bg-red-500 rounded-lg text-white">
                  Logout
                </button>
              </>
            ):(
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
            )

            }
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;