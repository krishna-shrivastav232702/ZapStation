import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Signup from '../scenes/authentications/Signup';
import Login from '../scenes/authentications/Login';
import Logout from '../scenes/authentications/Logout';
import Home from '../scenes/Home/Home';
import Map from '../components/Map/Map';
import SingleStation from '../components/SingleStation/SingleStation';
import Confirmation from '../components/Confirmation';


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
      },
      {
        path:"/map/:id",
        element:<SingleStation/>,
        loader:({params})=>fetch(`http://localhost:7019/station/api/station/${params._id}`)
      },
      {
        path:"/bookSlot/:slotid/:uid",
        element:<Confirmation/>,
        loader:({params})=>fetch(`http://localhost:7019/slot/bookslot/${params._id}/${params.uid}`)
      }
    ]
  }
]);

export default Router;
