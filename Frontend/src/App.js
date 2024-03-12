import React, { useEffect, useState } from 'react';
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
import DisplayProject from './components/DisplayProject';
import AdminLayout from './components/Admin/AdminLayout';
import ClientFeedBack from './components/Client/ClientFeedback';
import EscalationMatrix from './components/EscalationMatrix';
import PrivateRoute from './PrivateRoute';;
import IndexLayout from './IndexLayout';
import AddUserForm from './components/Admin/AddUserForm';
import PhaseMilestones from './components/ProjectManager/PhaseMilestones';
import OverView from './components/OverView';
import RiskProfiling from './components/RiskProfiling';

function App() {
  const [authenticated, setAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
      ? setUserRole(localStorage.getItem("userRole"))
      : setUserRole(localStorage.getItem(""));

  }, [authenticated]);

  const clientRoutes = userRole == "Client" && (
    <>
      <Route index element={<ClientDashboard />} />
      <Route path="/clientfeedback" element={<ClientFeedBack />} />
    </>
  );
  const projectManagerRoutes = userRole == "ProjectManager" && (
    <>
      <Route index element={<ProjectManagerDashboard />} />
      <Route path="/escalationmatrix" element={<EscalationMatrix />} />
    </>
  );
  const adminRoutes = userRole == "Admin" && (
    <>
      <Route index element={<AdminDashboard />} />
      <Route path="/:id" element={<AdminLayout />}>
        <Route index element={<EscalationMatrix />} />
        <Route path="escalationmatrix" index element={<EscalationMatrix />} />
        <Route path="phasemilestone" element={<PhaseMilestones />} />
        <Route path="overview" element={<OverView />} />
        <Route path="riskprofile" element={<RiskProfiling />} />
      </Route>
      <Route path="/adduserform" element={<AddUserForm />} />

    </>
  );

  const auditorRoutes = userRole == "Auditor" && (
    <>
      <Route index element={<AuditorDashboard />} />
      <Route path='/escalationmatrix' element={<EscalationMatrix />} />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route exact path="/" element={<PrivateRoute authenticated={authenticated} setAuthenticated={setAuthenticated} />}>
          <Route path="/" element={<IndexLayout />}>
            {clientRoutes}
            {projectManagerRoutes}
            {adminRoutes}
            {auditorRoutes}
          </Route>
          {/* <Route path="*" element={<NoPageFound />} /> */}
        </Route>
      </Routes>
    </Router>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route path='admin/dashboard' element={<AdminDashboard />}>
    //       </Route>
    //       <Route path='/admin/dashboard/:Projectid' element={<AdminLayout/>}/>
    //       <Route path="/auditor/dashboard" element={<AuditorDashboard />} />

    //       <Route path="/client/dashboard" element={<ClientDashboard />} />

    //       <Route path="/projectmanager" element={<ProjectManagerDashboard />} />
    //       <Route path="/projectmanager/dashboard" element={<ProjectManagerDashboard />} />

    //       <Route path='/userlogin' element={<UserLogin />} />

    //     </Route>
    //   </Routes>
    // </Router>
  );
}

export default App;
