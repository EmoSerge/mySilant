import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const is_Auth = useSelector((state) => state.user);
    const accessToken = localStorage.getItem('accessToken');
    const Authenticated = localStorage.getItem('Authenticated');

    if (is_Auth.data || Authenticated || accessToken) {
        return <Outlet />;
    } else {
        return <Navigate to={"/"} />;
    }
};

export { ProtectedRoutes };
