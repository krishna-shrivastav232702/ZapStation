import React from "react"
import {Outlet } from "react-router-dom"
import MyFooter from "./scenes/Footer.jsx/MyFooter"

function App() {

  return (
    <div>
      <Outlet/>  
    </div>
  )
}

export default App
