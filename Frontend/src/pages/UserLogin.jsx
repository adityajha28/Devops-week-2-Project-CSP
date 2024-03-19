import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Api from "../api/Api";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const { isAuthenticated, user, isLoading, loginWithRedirect, loginWithPopup, logout } = useAuth0();
  const navigate = useNavigate();

  const fetchUserRole = async () => {
    console.log("user", user);
    if (isAuthenticated) {
      try {
        const response = await Api.get(`application-user/${user.email}`);
        console.log(response.data);
        console.log(response.data.role);
        if (response.data.role == '') {
          await Api.put(`/application-user/${user.email}`, {
            name: user.name,
            email: user.email,
            role: "Client"
          });
          localStorage.setItem("userRole", response.data.role||"Client");
        }
        else{
          localStorage.setItem("userRole", response.data.role||"Admin");
          
        }

      } catch (error) {
        const userData = {
          email: user?.email,
          role: "Client",
          name: user?.name
        };
        try {
          const createUserResponse = await Api.post('application-user', userData);
          localStorage.setItem("userRole", createUserResponse.data.role || "Client");
        } catch (postError) {
          console.error("Error while creating user:", postError);
          // Handle error during user creation if needed
        }
      }
      navigate('/');
    }

  };

  useEffect(() => {
    fetchUserRole();
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogIn = () => {

    loginWithPopup();
  };

  const handleLogout=()=>{
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.setItem("userRole","");
  }

  return (
    <div className="w-1/4 mx-auto my-auto">
      <div className="flex flex-col items-center h-screen">
        <h1>Login Please with auth0</h1>
        <button
          onClick={() =>
            isAuthenticated
              ? handleLogout()
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
