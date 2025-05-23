import "./App.css";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

import { loader as menuLoader } from "./features/menu/Menu";
import { loader as orderLoader } from "./features/order/Order";
import {loader as historyLoader} from "./features/order/OrderHistory";
import { action as createOrderAction } from "./features/order/CreateOrder";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import OrderHistory from "./features/order/OrderHistory";
import Statistics from "./features/statistics/Statistics";


function ProtectedRoute({ children }) {
  const username = localStorage.getItem('username');
  if (!username) return <Navigate to="/" />;
  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      { path: "", element: <Home /> },
      { path: 'history', element: <OrderHistory />, loader: historyLoader },
      
      {
        path: "menu",
        element: (
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        ),
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "order/new",
        element: (
          <ProtectedRoute>
            <CreateOrder />
          </ProtectedRoute>
        ),
        action: createOrderAction,
      },
      {
        path: "order/:id",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
  {
    path: "/statistics",
    element: <Statistics />,
  },
]);
function App({ children }) {
  return <RouterProvider router={router}>{children}</RouterProvider>;
}

export default App;
