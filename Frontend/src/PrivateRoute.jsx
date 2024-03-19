import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Api from "./api/Api";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ component: Component,authenticated,setAuthenticated, ...rest }) => {
    // const [authenticated, setAuthenticated] = useState(null);
    const { user } =useAuth0();
    const checkLogin = async () => {
        try {
            console.log("user",user)
            const response = await Api.get(`application-user/${user?.email}`);
            localStorage.setItem("userRole", response.data.role || "Client");
            console.log(response.data.role);
            setAuthenticated(true);
        } catch (error) {
            console.error(error);
            setAuthenticated(false);
        }
    };
    useEffect(() => {
        console.log(localStorage.getItem("userRole"));
        checkLogin();
    }, [user]);

    if (authenticated == '') {  
        return <div>Loading...</div>;
    }

    return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;