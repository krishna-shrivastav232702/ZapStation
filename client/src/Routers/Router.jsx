import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Signup from '../scenes/authentications/Signup';
import Login from '../scenes/authentications/Login';
import Logout from '../scenes/authentications/Logout';
import Home from '../scenes/Home/Home';
import Map from '../components/Map/Map';


const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home /> 
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/login",
        element: <Login />
      },{
        path:"/map",
        element:<Map/>
      }
    ]
  }
]);

export default Router;
