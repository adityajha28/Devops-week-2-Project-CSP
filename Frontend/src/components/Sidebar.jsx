import React, { useState } from "react";
import "../styling/sidebar.css"; // Importing CSS file for styling
import "monday-ui-react-core/tokens"; // Importing tokens from monday-ui-react-core
import { Box, Menu, MenuItem, Flex } from "monday-ui-react-core"; // Importing necessary components from monday-ui-react-core
import CreateProject from "./CreateProject";
import { useNavigate } from "react-router-dom";

// Sidebar component
const Sidebar = () => {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);

  const handleNavigation = () => {
    navigate('/');
  }

  return (
    <div className="sidebar-wrapper"> {/* Wrapper div for the sidebar */}
      <Box className="sidebar-menu-box"> {/* Box component for the sidebar menu */}
        <button className="" style={{ margin: "2px" }} onClick={(e) => { setShowModel(true) }}>Create Project</button>
        <Flex justify="Center" gap={10}> {/* Flex container with center alignment and gap */}
          <Menu>
            <MenuItem title="Projects" onClick={(e) => { handleNavigation() }} />
            <MenuItem title="Projects Managers" />
            <MenuItem title="Employees" />
          </Menu>
        </Flex>
      </Box>
      <CreateProject showModal={showModel} setShowModal={setShowModel} />
    </div>
  );
};

export default Sidebar; // Exporting Sidebar component
