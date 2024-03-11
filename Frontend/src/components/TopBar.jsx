import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Box, Search, Avatar } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import "../styling/topbar.css";

import { useNavigate } from "react-router-dom";
import Api from "./Api";

const TopBar = () => {
  const { isAuthenticated, user, isLoading, loginWithRedirect, logout } =
    useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (isAuthenticated && !isLoading) {
          
          const response = await Api.get(`application-user/${user.email}`);
          const userRole = response.data.role || "Client";
          // console.log(userRole);

          switch (userRole) {
            case "Admin":
              navigate("/admin/dashboard");
              break;
            case "Client":
              navigate("/client/dashboard");
              break;
            case "Auditor":
              navigate("/auditor/dashboard");
              break;
            case "ProjectManager":
              navigate("/projectmanager/dashboard");
              break;
            default:
              navigate("/");
          }
        }
      } catch (error) {
        const res=await Api.post('application-user',{email:user.email,role:'Client'});
        console.log(res);
        console.error("Error fetching user role:", error);
        navigate("/client/dashboard");
      }
    };

    fetchUserRole();
  }, [isAuthenticated, isLoading, navigate]);
  return (
    <div className="top-bar-wrapper">
      <Flex justify="SpaceBetween" className="bar-container">
        <Box className="box1">
          <Flex gap={8}>
            <Box className="logo-container">
              <img src="/images/CS.png" />
            </Box>

            <Box className="company-name-container">
              <label>Customer Support</label>
            </Box>
          </Flex>
        </Box>
        <Box className="box2">
          <Search placeholder="Search.." />
        </Box>
        <Box>
          <button
            onClick={() =>
              isAuthenticated
                ? logout({ returnTo: window.location.origin })
                : loginWithRedirect()
            }
            className="bg-blue-500 text-white px-4 py-2 text-lg font-bold rounded"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </Box>
        <Box className="box3">
          <Flex justify="Center" gap={10}>
            <Avatar
              ariaLabel="Hadas Fahri"
              size="large"
              src="https://style.monday.com/static/media/person1.de30c8ee.png"
              type="img"
            />
            <Box>
              <Flex direction="Column">
                <p className="font-bold text-lg">
                  {isAuthenticated ? user.name || user.email : "Guest"}
                </p>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default TopBar;
