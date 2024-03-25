import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Login from './Login';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "home",
    element:<App/>
  },
  {
    path: "/",
    element: <Login/>
  },

]);
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);



