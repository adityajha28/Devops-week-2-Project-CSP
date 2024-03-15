import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PhaseMilestones from "../../pages/PhaseMilestones";

const ProjectManagerDashboard = () => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const [Token,  setToken] = useState(null);

  const fetchToken = async () => {
    if (isAuthenticated) {
      const temp = await getAccessTokenSilently();
      setToken(temp);
    }
  };
  useEffect(() => {

    fetchToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) {
    toast.info('Loading...');
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    toast.error('You must be logged in to view this page.');
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <div className="items-center space-y-16">
      <h1 className="text-4xl font-bold text-center">Project Manager Dashboard</h1>
      {/* Your PmDashboard specific components go here */}


      <div className="flex flex-col items-center space-y-16">

        <div className="w-full p-8 bg-red-50 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-4 text-red-600 text-center">
            Approved Team{" "}
          </h2>
          <PhaseMilestones />
        </div>

        
      </div>
    </div>
  );
};

export default ProjectManagerDashboard;
