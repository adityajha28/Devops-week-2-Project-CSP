import React from "react";
import "../styling/sidebar.css"; // Importing CSS file for styling
import "monday-ui-react-core/tokens"; // Importing tokens from monday-ui-react-core
import { Box, Menu, MenuItem, Flex } from "monday-ui-react-core"; // Importing necessary components from monday-ui-react-core

// Sidebar component
const Sidebar = () => {
  return (
    <div className="sidebar-wrapper"> {/* Wrapper div for the sidebar */}
      <Box className="sidebar-menu-box"> {/* Box component for the sidebar menu */}
        <Flex justify="Center" gap={10}> {/* Flex container with center alignment and gap */}
          <Menu>
            <MenuItem title="Projects" />
            <MenuItem title="Projects Managers" />
            <MenuItem title="Employees" />
          </Menu>
        </Flex>
      </Box>
    </div>
  );
};

export default Sidebar; // Exporting Sidebar component
