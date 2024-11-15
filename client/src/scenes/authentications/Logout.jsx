import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const {logout} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logout().then(()=>{
      alert("Logout Successfull");
      navigate("/",{replace:true});
    }).catch((error)=>{
      console.error(`Error : ${error.message}`);
    })
  }
  return (
    <div className='h-screen bg-pastelGreen flex items-center justify-center'>
      <button className='text-black bg-white font-bold p-2 rounded-2xl hover:bg-black hover:text-white transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105 mr-4' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout