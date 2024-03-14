import React, { useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ClientFeedBack from "./ClientFeedbackForm";


const ClientDashboard = () => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();

  const fetchToken = async () => {
    if (isAuthenticated) {
      const temp = await getAccessTokenSilently();
    }
  };
  useEffect(() => {

    fetchToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) {
    
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    toast.error('You must be logged in to view this page.');
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-16">
      <h1 className="text-4xl font-bold text-center">Client Dashboard</h1>
       <ClientFeedBack/>
    </div>
  );
};

export default ClientDashboard;
