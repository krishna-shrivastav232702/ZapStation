import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password).then(() => {
      alert("Login Successful");
      navigate("/", { replace: true });
    }).catch((error) => {
      alert("Incorrect Password");
      setError(error.message);
    })
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pastelGreen">
      <div className="backdrop-blur-lg shadow-lg rounded-3xl w-full bg-white max-w-md p-8 border border-black border-opacity-10 hover:transition hover:delay-100 hover:duration-300">
        <h1 className="text-3xl font-black text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-5">
          
          <label className="flex flex-col">
            <span className="font-black text-base">Email</span>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              className="p-4 mt-2 bg-transparent text-black border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all duration-300 ease-in-out" 
            />
          </label>

          <label className="flex flex-col">
            <span className="font-black text-base">Password</span>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              className="p-4 mt-2 bg-transparent text-black border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all duration-300 ease-in-out" 
            />
          </label>

          <div className="text-center mt-4">
            <button 
              type="submit" 
              className="bg-white font-black  hover:bg-black hover:text-white px-4 py-2 rounded-2xl transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
