import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Box, Search, Avatar } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import "../styling/topbar.css";

const TopBar = () => {
  const { isAuthenticated, user,  loginWithRedirect, logout } =
    useAuth0();
  useEffect(()=>{
    console.log("topbar");
  },[]);

  const handleLogout=()=>{
    localStorage.setItem("userRole","");
    logout({ returnTo: window.location.origin });
  }
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
                ? handleLogout()
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
