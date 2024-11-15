import React, { useContext, useState } from 'react'
import { useLocation } from "react-router-dom"
import { AuthContext } from "../../Context/AuthProvider"
import { FaSearch } from "react-icons/fa"
import { Link } from 'react-router-dom'
import image1 from "../../assets/image1.png"

const Home = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  }

  return (
    <div>
      <div className="min-h-screen  p-4">
        <div className="w-full mt-2">
          <div className="flex items-center justify-between">

            <h1 className="text-5xl font-bold text-black ml-12 hover:scale-110 transition ease-in-out duration-500">ZapStation</h1>


            <div className="mt-4 mb-2 w-full max-w-lg flex items-center justify-center border border-black rounded-full overflow-hidden shadow-lg bg-white/30 backdrop-blur-md">
              <input
                type="text"
                placeholder="Search nearby stations"
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full px-6 py-3 bg-transparent text-black text-lg placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
              />
              <FaSearch className="text-black absolute right-6 cursor-pointer text-xl hover:scale-110 hover:transition-all hover:ease-in-out duration-500" />
            </div>


            <div className="flex items-center space-x-6 mr-12">
              {
                user ? (
                  <Link to="/logout" className="text-white bg-black hover:scale-105 font-semibold px-6 py-3 rounded-full  transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
                    Logout
                  </Link>
                ) : (
                  <>
                    <Link to="/signup" className="text-white bg-black hover:scale-105 font-semibold px-6 py-3 rounded-full  transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
                      Signup
                    </Link>
                    <Link to="/login" className="text-white bg-black hover:scale-105 font-semibold px-6 py-3 rounded-full  transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
                      Login
                    </Link>
                  </>
                )
              }
            </div>
          </div>


        </div>
        <div className='flex  items-center  '>
          <div className='w-3/5 mt-20 ml-20 mr-16'>
            <img src={image1} />
          </div>
          <div className='flex flex-col mt-28'>
            <h1 className='font-bold  text-4xl mb-9 '>Welcome to the league of change-makers. </h1>
            <h3 className='text-lg font-semibold mr-12'>At ZapStation, we're more than just a platform—we're your partner in driving a cleaner tomorrow. Find EV charging stations that fit your journey, reserve slots at your convenience, and power up with ease. Together, let's make a difference, one charge at a time.</h3>
            <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>

              <div>
                <h3 className='text-3xl font-bold '>6000+</h3>
                <p className='text-xl'>Stations across India</p>
              </div>
              <div>
                <h3 className='text-3xl font-bold '>2.5 Lakhs+</h3>
                <p className='text-xl'>Change makers</p>
              </div>
              <div>
                <h3 className='text-3xl font-bold '>12000+</h3>
                <p className='text-xl'>Tons of CO2e saved</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
