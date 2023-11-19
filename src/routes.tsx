import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Main />,
  },
]);

export default routes;
