import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Dashboard from "./layout/dashboard";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Sales from "./pages/Sales";
import Payments from "./pages/Payments";
import Products from "./pages/Products";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/sales",
        element: <Sales />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);

export default routes;
