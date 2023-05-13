import React from "react";
import { Outlet } from "react-router-dom";

import { useAppSelector } from "redux/hooks";
import { selectUser } from "features/authSlice";
import { Error } from "pages";

const AdminRoute = () => {
  const { isAdmin } = useAppSelector(selectUser);

  return isAdmin ? <Outlet /> : <Error message="Forbidden!" />;
};

export default AdminRoute;
