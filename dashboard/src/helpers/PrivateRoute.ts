import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";


const PrivateRoute = ({ children }: any) => {
    const authContext = useContext(AuthContext);
    return authContext.isAuthenticated ? children : null;
};

export default PrivateRoute;