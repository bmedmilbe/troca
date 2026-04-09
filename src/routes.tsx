import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import PrivateLayout from "./pages/PrivateLayout";
import TransactionPage from "./pages/TransactionPage";
import UsersPage from "./pages/UsersPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "login/", element: <LoginPage /> }],
  },
  {
    element: <PrivateLayout />,
    children: [
      { index: true, element: <UsersPage /> },
      { path: "users/:id/", element: <TransactionPage /> },
    ],
  },
]);

export default routes;
