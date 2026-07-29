
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
// import "../css/Signup.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";



const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/signup", formData);

      alert("Registration Successful");
      navigate("/signin");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#F5EFE7] via-[#D8C4B6] to-[#3E5879] flex items-center justify-center p-6">

    <div className="w-full max-w-5xl min-h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl grid lg:grid-cols-2">

      {/* Left Side */}

<div className="hidden lg:flex flex-col justify-center items-center bg-[#213555] text-white p-12">

  <h1 className="text-5xl font-bold mb-7 text-center">
    Rental Marketplace
  </h1>
  

  <p className="text-lg text-center leading-8 text-gray-200 max-w-sm">
    Find your perfect rental anytime, anywhere.
    <br />
    Apartments, Houses, Cars, Bikes and much more.
  </p>
    
  {/* Category Boxes */}

  <div className="grid grid-cols-2 gap-5 mt-8 w-full max-w-sm">

    <div className="bg-white/10 border border-white/10 rounded-2xl h-28 flex flex-col justify-center items-center hover:bg-white/20 transition duration-300">

      <span className="text-4xl">🏢</span>

      <p className="mt-3 font-semibold text-lg">
        Apartment
      </p>

    </div>

    <div className="bg-white/10 border border-white/10 rounded-2xl h-28 flex flex-col justify-center items-center hover:bg-white/20 transition duration-300">

      <span className="text-4xl">🚗</span>

      <p className="mt-3 font-semibold text-lg">
        Car
      </p>

    </div>

    <div className="bg-white/10 border border-white/10 rounded-2xl h-28 flex flex-col justify-center items-center hover:bg-white/20 transition duration-300">

      <span className="text-4xl">🏍️</span>

      <p className="mt-3 font-semibold text-lg">
        Bike
      </p>

    </div>

    <div className="bg-white/10 border border-white/10 rounded-2xl h-28 flex flex-col justify-center items-center hover:bg-white/20 transition duration-300">

      <span className="text-4xl">🏠</span>

      <p className="mt-3 font-semibold text-lg">
        House
      </p>

    </div>

  </div>

</div>

      {/* Right Side */}

      <div className="flex flex-col justify-center items-center px-16 py-16">

        <div className="w-full max-w-md">

          <h2 className="text-5xl font-bold text-[#213555] text-center mb-2">
            Sign Up
          </h2>
          
          <p className="text-center text-[#3E5879] text-lg mb-8">
            Create your Rental Marketplace account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Full Name */}

            <div>
              <label className="block mb-2 font-semibold text-[#213555]">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full h-12 px-5 rounded-2xl bg-white/20 border border-white/50 backdrop-blur-md outline-none text-[#213555] placeholder:text-gray-500 focus:ring-2 focus:ring-[#213555] transition"
              />
            </div>
            
            {/* Email */}

            <div>
              <label className="block mb-2 font-semibold text-[#213555]">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 px-5 rounded-2xl bg-white/20 border border-white/50 backdrop-blur-md outline-none text-[#213555] placeholder:text-gray-500 focus:ring-2 focus:ring-[#213555] transition"
              />
            </div>
            
            {/* Password */}

            <div>
              <label className="block mb-2 font-semibold text-[#213555]">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full h-12 px-5 rounded-2xl bg-white/20 border border-white/50 backdrop-blur-md outline-none text-[#213555] placeholder:text-gray-500 focus:ring-2 focus:ring-[#213555] transition"
              />
            </div>
            
            {/* Register As */}

            <div>
              <label className="block mb-2 font-semibold text-[#213555]">
                Register As
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full h-12 px-5 rounded-2xl bg-white/20 border border-white/50 backdrop-blur-md outline-none text-[#213555] focus:ring-2 focus:ring-[#213555] transition"
              >
                <option value="user">User</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            {/* Button */}

            <button
              type="submit"
              className="w-full h-12 bg-[#213555] hover:bg-[#3E5879] rounded-2xl text-white text-lg font-semibold shadow-lg hover:shadow-2xl transition duration-300"
            >
              Create Account
            </button>

          </form>
        
          <p className="text-center mt-6 text-[#213555]">
            Already have an account?

            <span
              onClick={() => navigate("/signin")}
              className="ml-2 font-bold cursor-pointer hover:text-[#3E5879]"
            >
              Sign In
            </span>

          </p>

        </div>

      </div>

    </div>

  </div>
);

};

export default Signup;