import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children, allowedRoles}) => {
    const token = useSelector((state) => state.jwt);
    if(!token){
        return <Navigate to="/login" />
    }
    const decoded = jwtDecode(token);
    const userRole = decoded.applicantType || decoded.accountType || decoded.role;
    if(allowedRoles && !allowedRoles.includes(userRole)){
        return <Navigate to="/" />
    }
    return children;
}
export default ProtectedRoute;