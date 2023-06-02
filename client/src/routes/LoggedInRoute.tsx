import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsLoggedIn, selectUser } from "features/authSlice";
import { Login } from "pages";

const LoggedInRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { isBanned } = useSelector(selectUser);
  return (isLoggedIn && !isBanned) ? <Outlet /> : <Login />;
};

export default LoggedInRoute;
