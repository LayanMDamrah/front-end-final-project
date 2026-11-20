import { createBrowserRouter, Navigate } from "react-router";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./Home/Home";
import Login from "./LogIn/LogIn";
import Register from "./Register/Register";
import Products from "./Products/Products";
import Categories from "./Categories/Categories";
import ProuductsDetails from "./Products/ProuductsDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path:"products/:id",
        element:<ProuductsDetails/>
      }
      
    ],
  },
]);

export default router;
