import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import "monday-ui-react-core/tokens";
import Layout from './Layout';
import AdminDashboard from './components/Admin/AdminDashboard';
import AuditorDashboard from './components/Auditor/AuditorDashboard';
import ClientDashboard from './components/Client/ClientDashboard';
import ProjectManagerDashboard from './components/ProjectManager/ProjectManagerDashboard';
import UserLogin from './pages/UserLogin';
import AdminLayout from './components/Admin/AdminLayout';
import EscalationMatrix from './pages/EscalationMatrix';
import PrivateRoute from './PrivateRoute';
import AddUserForm from './components/Admin/AddUserForm';
import PhaseMilestones from './pages/PhaseMilestones';
import OverView from './pages/OverView';
import RiskProfiling from './pages/RiskProfiling';
import ScopeAndStack from './pages/ScopeAndStack';
import Stakeholders from './pages/Stakeholders';
import SprintDetails from './pages/Sprintdetail';
import VersionHistory from './pages/VersionHistory';
import AuditHistoryComponent from './pages/AuditHistory';
import ClientFeedbackForm from './components/Client/ClientFeedbackForm';
import ClientFeedback from './pages/ClientFeedback';
import AuditorLayout from './components/Auditor/AuditorLayout';
import ProjectManagerLayout from './components/ProjectManager/ProjectManagerLayout';
import ClientLayout from './components/Client/ClientLayout';
import ClientMeetingMoMManagement from './pages/ClientMeetingMoMManagement';
import ProjectUpdatesManagement from './pages/ProjectUpdatesManagement';
import ResourceManagement from './pages/ResourceManagement';

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
      <Route path="/:id" element={<ClientLayout />}>
        <Route index element={<OverView />} />
        <Route path="escalationmatrix" element={<EscalationMatrix />} />
        <Route path="phasemilestone" element={<PhaseMilestones />} />
        <Route path="overview" element={<OverView />} />
        <Route path="riskprofile" element={<RiskProfiling />} />
        <Route path="scopeandstack" element={<ScopeAndStack />} />
        <Route path="stakeholders" element={<Stakeholders />} />
        <Route path="sprintdetails" element={<SprintDetails />} />
        <Route path="VersionHistory" element={<VersionHistory />} />
        <Route path="AuditHistory" element={<AuditHistoryComponent />} />
        <Route path="mom" element={<ClientMeetingMoMManagement/>} />
        <Route path="projectupdates" element={<ProjectUpdatesManagement />} />
        <Route path="resource" element={<ResourceManagement/>} />
      </Route>
      <Route path="clientfeedbackform" element={<ClientFeedbackForm />} />
    </>
  );

  const adminRoutes = userRole == "Admin" && (
    <>
      <Route index element={<AdminDashboard />} />
      <Route path="/:id" element={<AdminLayout />}>
        <Route index element={<OverView />} />
        <Route path="escalationmatrix" element={<EscalationMatrix />} />
        <Route path="phasemilestone" element={<PhaseMilestones />} />
        <Route path="overview" element={<OverView />} />
        <Route path="riskprofile" element={<RiskProfiling />} />
        <Route path="scopeandstack" element={<ScopeAndStack />} />
        <Route path="stakeholders" element={<Stakeholders />} />
        <Route path="sprintdetails" element={<SprintDetails />} />
        <Route path="VersionHistory" element={<VersionHistory />} />
        <Route path="AuditHistory" element={<AuditHistoryComponent />} />
        <Route path="clientfeedback" element={<ClientFeedback />} />
        <Route path="mom" element={<ClientMeetingMoMManagement/>} />
        <Route path="projectupdates" element={<ProjectUpdatesManagement />} />
        <Route path="resource" element={<ResourceManagement/>} />
      </Route>
      <Route path="adduserform" element={<AddUserForm />} />

    </>
  );

  const auditorRoutes = userRole == "Auditor" && (
    <>
      <Route index element={<AuditorDashboard />} />
      <Route path="/:id" element={<AuditorLayout />}>
        <Route index element={<OverView />} />
        <Route path="escalationmatrix" element={<EscalationMatrix />} />
        <Route path="phasemilestone" element={<PhaseMilestones />} />
        <Route path="overview" element={<OverView />} />
        <Route path="riskprofile" element={<RiskProfiling />} />
        <Route path="scopeandstack" element={<ScopeAndStack />} />
        <Route path="stakeholders" element={<Stakeholders />} />
        <Route path="sprintdetails" element={<SprintDetails />} />
        <Route path="VersionHistory" element={<VersionHistory />} />
        <Route path="AuditHistory" element={<AuditHistoryComponent />} />
        <Route path="clientfeedback" element={<ClientFeedback />} />
        <Route path="mom" element={<ClientMeetingMoMManagement/>} />
        <Route path="projectupdates" element={<ProjectUpdatesManagement />} />
        <Route path="resource" element={<ResourceManagement/>} />

      </Route>
    </>
  );
  const projectManagerRoutes = userRole == "ProjectManager" && (
    <>
      <Route index element={<ProjectManagerDashboard />} />
      <Route path="/:id" element={<ProjectManagerLayout />}>
        <Route index element={<OverView />} />
        <Route path="escalationmatrix" element={<EscalationMatrix />} />
        <Route path="phasemilestone" element={<PhaseMilestones />} />
        <Route path="overview" element={<OverView />} />
        <Route path="riskprofile" element={<RiskProfiling />} />
        <Route path="scopeandstack" element={<ScopeAndStack />} />
        <Route path="stakeholders" element={<Stakeholders />} />
        <Route path="sprintdetails" element={<SprintDetails />} />
        <Route path="VersionHistory" element={<VersionHistory />} />
        <Route path="AuditHistory" element={<AuditHistoryComponent />} />
        <Route path="clientfeedback" element={<ClientFeedback />} />
        <Route path="mom" element={<ClientMeetingMoMManagement/>} />
        <Route path="projectupdates" element={<ProjectUpdatesManagement />} />
        <Route path="resource" element={<ResourceManagement/>} />
      </Route>
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route exact path="/" element={<PrivateRoute authenticated={authenticated} setAuthenticated={setAuthenticated} />}>
          <Route path="/" element={<Layout />}>
            {clientRoutes}
            {projectManagerRoutes}
            {adminRoutes}
            {auditorRoutes}
          </Route>
          {/* <Route path="*" element={<NoPageFound />} /> */}
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
