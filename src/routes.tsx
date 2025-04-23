import { createBrowserRouter } from "react-router-dom";
import FriendPage from "./pages/FriendPage";
import FriendsPage from "./pages/FriendsPage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import PrivateLayout from "./pages/PrivateLayout";
import TransactionPage from "./pages/TransactionPage";
import UsersPage from "./pages/UsersPage";
import GroundPage from "./pages/ground/GroundPage";
import GroundPrivateLayout from "./pages/GroundPrivateLayout";
import ProductsPage from "./pages/ground/ProductsPage";
import ClientsPage from "./pages/ground/ClientsPage";
import ClientPage from "./pages/ground/ClientPage";
import ExpensesPage from "./pages/ground/ExpensesPage";
import ExpensePage from "./pages/ground/ExpensePage";

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
      { path: "friends/", element: <FriendsPage /> },
      { path: "friends/:id/", element: <FriendPage /> },
    ],
  },
  {
    path: "ground/",
    element: <GroundPrivateLayout />,
    children: [
      { index: true, element: <GroundPage /> },
      { path: "products/", element: <ProductsPage /> },
      { path: "clients/", element: <ClientsPage /> },
      { path: "clients/:id", element: <ClientPage /> },
      { path: "expenses/", element: <ExpensesPage /> },
      { path: "expenses/:id", element: <ExpensePage /> },

      // { path: "clients/", element: <FriendsPage /> },

      // { path: "users/:id/", element: <TransactionPage /> },
      // { path: "friends/", element: <FriendsPage /> },
      // { path: "friends/:id/", element: <FriendPage /> },
    ],
  },
]);

export default routes;
