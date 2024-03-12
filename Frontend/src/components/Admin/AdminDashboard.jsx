import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
//import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//import AddUserForm from "./adduserform";
import { Link, useNavigate } from "react-router-dom";
import AddUserForm from "./AddUserForm";
import DisplayProject from "../DisplayProject";
import { Button, Flex } from "monday-ui-react-core";
import CreateProject from "../CreateProject";
//import FetchClientFeedback from "./fetchclientfeedback";

const AdminDashboard = () => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const [token, setToken] = useState(null);

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
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <div className="">
      <Flex>
        <Link to="/adduserform">
          <Button>Add User Form</Button>
        </Link>
      </Flex>
      
      <DisplayProject />
    </div>
  );
};

export default AdminDashboard;
