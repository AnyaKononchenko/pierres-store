import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsLoggedIn, selectUser } from "features/authSlice";
import { Login } from "pages";
import { LoginVariant } from "@customTypes/common";

const LoggedInRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { isBanned } = useSelector(selectUser);
  return (isLoggedIn && !isBanned) ? <Outlet /> : <Login variant={LoginVariant.access}/>;
};

export default LoggedInRoute;
