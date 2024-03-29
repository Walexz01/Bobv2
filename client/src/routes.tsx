import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Dashboard from "./layout/Dashboard";
import Customers from "./pages/Dashboard/Customers";
import Home from "./pages/Dashboard/Home";
import Orders from "./pages/Dashboard/Orders";
import Payments from "./pages/Dashboard/Payments";
import Products from "./pages/Dashboard/Products";
import Sales from "./pages/Dashboard/Sales";
import Landing from "./layout/Landing";
import About from "./components/Landing/About";
import OrderList from "./pages/Dashboard/OrderList";
import ItemList from "./pages/Dashboard/ItemList";
import CreateOrder from "./pages/Dashboard/CreateOrder";
import Seller from "./pages/Dashboard/Seller";
import Login from "./pages/Dashboard/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    children: [
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "dash",
    element: <Dashboard />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/list/:name",
        element: <OrderList />,
      },
      {
        path: "orders/items/:id",
        element: <ItemList />,
      },
      {
        path: "orders/new/:id",
        element: <CreateOrder />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "workers",
        element: <Seller />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
