import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContextProvider";


const PrivateRoute = ({ children }: any) => {
    const authContext = useContext(AuthContext);
    if (!authContext.isAuthenticated) {
        Navigate({to: '/'})
    }
    return children;
};

export default PrivateRoute;