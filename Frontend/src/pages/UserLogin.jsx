import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Api from "../api/Api";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const { isAuthenticated, user, isLoading, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const fetchUserRole = async () => {
    try {
      if (isAuthenticated) {
        const response = await Api.get(`application-user/${user.email}`);
        console.log(response.data.role);
        if (response.data.role != '') {
          localStorage.setItem("userRole", response.data.role || "Client");
        } else {
          await Api.put(`/application-user/${user.email}`, {
            name: user.name,
            email: user.email,
            role: "Admin"
          });
          localStorage.setItem("userRole", "Admin" || "Client");
        }
        navigate('/');
      }

    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogIn = () => {
    loginWithRedirect();
  };

  return (
    <div className="w-1/4 mx-auto my-auto">
      <div className="flex flex-col items-center h-screen">
        <h1>Login Please with auth0</h1>
        <button
          onClick={() =>
            isAuthenticated
              ? ''
              : handleLogIn()
          }
          className="bg-blue-500 text-white px-4 py-2 text-lg font-bold rounded"
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default UserLogin;
