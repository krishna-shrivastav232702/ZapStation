import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const state = e.target.state.value;
    const city = e.target.city.value;
    const country = e.target.country.value;

    try {
      const userCredential = await createUser(email, password);
      const firebaseUser = userCredential.user;

      const userData = {
        uid: firebaseUser.uid,
        email,
        password,
        name,
        state,
        city,
        country
      };

      await axios.post("http://localhost:7019/user/createUser", userData, {
        headers: {
          Authorization: `Bearer ${await firebaseUser.getIdToken()}`
        }
      })

      alert("Sign up successfull");
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="h-screen flex items-center justify-center bg-pastelGreen ">
      <div className="  backdrop-blur-lg shadow-lg rounded-2xl w-full bg-white max-w-md p-8 border border-black border-opacity-20  hover:transition hover:delay-100 hover:duration-300">
        <h1 className="text-2xl font-black text-center  mb-3">Sign Up</h1>

        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className=" font-black ">Name</span>
            <input type="text" name="name" placeholder="Enter your name" className="p-2 bg-transparent text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" />
          </label>

          <label className="flex flex-col">
            <span className=" font-black ">Email</span>
            <input type="email" name="email" placeholder="Enter your email" className="p-2 bg-transparent text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" />
          </label>

          <label className="flex flex-col">
            <span className=" font-black ">Password</span>
            <input type="password" name="password" placeholder="Enter your password" className="p-2 bg-transparent text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" />
          </label>

         

          <label className="flex flex-col">
            <span className="font-black ">Country</span>
            <input type="text" name="state" placeholder="Enter your state" className="p-2 bg-transparent  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" />
          </label>

          <label className="flex flex-col">
            <span className="font-black  ">State</span>
            <input type="text" name="state" placeholder="Enter your state" className="p-2 bg-transparent  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" />
          </label>

          <label className="flex flex-col">
            <span className="font-black">City</span>
            <input type="text" name="state" placeholder="Enter your state" className="p-2 bg-transparent  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" />
          </label>

          
          <div className='text-center'>
            <button type="submit" className=" bg-white font-black  hover:bg-black hover:text-white px-4 py-2 rounded-2xl transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105 ">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup