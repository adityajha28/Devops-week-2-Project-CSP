import React from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import "monday-ui-react-core/tokens";
import { Button } from "monday-ui-react-core";
import Layout from './Layout';
import Project from './components/Project';
import AdminDashboard from './components/Admin/AdminDashboard';
import AuditorDashboard from './components/Auditor/AuditorDashboard';
import ClientDashboard from './components/Client/ClientDashboard';
import ProjectManagerDashboard from './components/ProjectManager/ProjectManagerDashboard';
import UserLogin from './UserLogin';


axios.defaults.baseURL = 'http://localhost:4004';
axios.defaults.withCredentials = true;
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="/" element={<Project />} /> */}

          {/* dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/auditor/dashboard" element={<AuditorDashboard />} />

          <Route path="/client/dashboard" element={<ClientDashboard />} />

          <Route path="/projectmanager" element={<ProjectManagerDashboard />} />
          <Route path="/projectmanager/dashboard" element={<ProjectManagerDashboard />} />

          {/* <Route path="/auditor/projects" element={<AuditorProjects />} /> */}

          {/* <Route path='/header' element={<Header />} /> */}
          <Route path='/userlogin' element={<UserLogin />} /> 
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
