import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function  RequireAuth()  {
    let {auth} = useAuth();
  let location = useLocation();
    console.log(auth)
  if (!auth.token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
    return (
        <Outlet />
    );
}



