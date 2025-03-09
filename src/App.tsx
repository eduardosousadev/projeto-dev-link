import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { Admin } from "./pages/admin/admin";
import { Networks } from "./pages/networks/nertworks";
import { Private } from "./routes/Private";
import { ErrorPage } from "./pages/error/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/admin",
    element: <Private><Admin /></Private>
  },
  {
    path: "/admin/social",
    element: <Private><Networks /></Private>
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);

export { router };
