import api from "../service/api";
import "../css/signin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/signin", formData);

      localStorage.setItem("token", response.data.token);

      alert("Login Successfull!");

      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-[#F5EFE7] via-[#D8C4B6] to-[#3E5879] flex items-center justify-center p-6">

    <div className="w-full max-w-5xl h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl grid lg:grid-cols-2">

      {/* Left Side */}

      <div className="hidden lg:flex flex-col justify-center items-center bg-[#213555] text-white p-10">

        <h1 className="text-5xl font-bold mb-5">
          Welcome Back
        </h1>

        <p className="text-lg text-center leading-8 mb-8 text-gray-200">
          Login to access your rentals,
          <br />
          bookings and marketplace dashboard.
        </p>
        

        <img
          src="/images/signup.jpg"
          alt="Rental Marketplace"
          className="w-[340px] object-contain"
        />

      </div>

      {/* Right Side */}
      
<div className="flex flex-col justify-center items-center px-16 py-16">

  <div className="w-full max-w-md ">

    <h2 className="text-5xl font-bold text-[#213555] text-center mb-3">
      Sign In
    </h2>
    

    <p className="text-center text-[#3E5879] text-lg mb-10">
      Welcome back to Rental Marketplace
    </p>
    

    <form onSubmit={handleSubmit} className="space-y-7">

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
    className="w-full h-14 px-5 rounded-2xl bg-white/20 border border-white/50 backdrop-blur-md outline-none focus:ring-2 focus:ring-[#213555] transition"
  />
</div>

      {/* Password */}
      
      <div>
        <label className="block text-[#213555] font-semibold mb-2">
          Password
        </label>

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full h-14 px-5 rounded-2xl bg-white/20 border border-white/50 backdrop-blur-md outline-none focus:ring-2 focus:ring-[#213555] transition"
        />
      </div>


      
      <button
        type="submit"
        className="w-full h-14 bg-[#213555] hover:bg-[#3E5879] rounded-2xl text-white text-xl font-semibold transition duration-300"
      >
        Login
      </button>

    </form>

    <p className="text-center mt-8 text-[#213555]">
      Don't have an account?

      <span
        onClick={() => navigate("/")}
        className="ml-2 font-bold cursor-pointer hover:text-[#3E5879]"
      >
        Sign Up
      </span>

    </p>

  </div>

</div>

    </div>

  </div>
);
};

export default signin;
