import React from "react"
import Map from "./components/Map/Map"
import {Outlet } from "react-router-dom"

function App() {

  return (
    <div>
      <Outlet/>  
    </div>
  )
}

export default App
