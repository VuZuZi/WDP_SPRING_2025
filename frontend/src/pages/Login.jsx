import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState(null);

        const {login} = useAuth();
        const navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();
   try {
        const response = await axios.post(
            "http://localhost:4000/api/auth/login", 
            {email, password});
          if(response.data.success){
            login(response.data.user)
            console.log(response.data.user)
            localStorage.setItem("token", response.data.token)
            if(response.data.user.role === "admin"){
                navigate('/admin-dashboard')
            }else{
                navigate("/employee-dashboard")
            }
          }
   } catch (error) {
        if(error.response && !error.response.data.success){
            setError(error.response.data.error)
        }
        else {
            setError("Server Error")
        }
   }
}
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-pacifico text-4xl text-white font-bold">
        Employee Management System
      </h2>
      <div className="border shadow-lg p-8 w-96 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-teal-300"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-teal-300"
              placeholder="*****"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-teal-600" />
              <span className="ml-2 text-gray-700 hover:text-teal-700 cursor-pointer">
                Remember me
              </span>
            </label>
            <a href="#" className="text-teal-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-lg font-bold hover:bg-teal-700 transition-all duration-300 shadow-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
