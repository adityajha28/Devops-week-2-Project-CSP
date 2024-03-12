// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Api from "./components/Api";

const ProtectedRoute = ({ children, allowedRole, ...rest }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    
    const fetchUserRole = async () => {
      try {
        const response = await Api.get(`/application-user/${user.email}`);
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        navigate("/userlogin");
      }
    };

    if (isAuthenticated && !isLoading) {
      fetchUserRole();
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  useEffect(()=>{
    console.log("procted route");
  },[]);
  if (isLoading) return null; 
  if (!isAuthenticated) {
    return <Navigate to="/userlogin" />;
  }

  if (userRole === allowedRole) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
