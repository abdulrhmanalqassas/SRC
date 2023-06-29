import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function  RequireAuth()  {
    const {auth} = useAuth()
    console.log("this is auth in required auth ")
   console.log(auth)
    return (
        <Outlet />
    );
}



