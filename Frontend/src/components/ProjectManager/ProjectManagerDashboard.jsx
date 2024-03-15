import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import DisplayProject from "../../pages/DisplayProject";


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
        <DisplayProject />
      </div>
    );
  };
        
export default ProjectManagerDashboard;
