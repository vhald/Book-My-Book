import { useSelector } from "react-redux";
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = ({ ...rest }) => {
    const { auth } = useSelector((state) => ({ ...state }));
    return auth && auth.token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
