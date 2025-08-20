import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({children}) => {
    const token = useSelector((state) => state.jwt);
    if(token){
        return <Navigate to="/" />
    }
    return children;
}
export default PublicRoute;