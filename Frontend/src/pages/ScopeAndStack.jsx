import React, { useEffect, useState } from "react";
import "monday-ui-react-core/tokens";
import './../styling/scope.css';
import Api from "../api/Api";
import { useParams } from "react-router-dom";
//not implemented backend logic for this
const ScopeAndStack = () => {
  const {id}=useParams();
  const [projectDetails, setProjectDetails] = useState({});
  const [scopeandstackId,setScopeandstakeId]=useState('');
  const [changesMade, setChangesMade] = useState(false);
  const userRole=localStorage.getItem("userRole");

  const handleSubmit = async () => {
    if( userRole=="Auditor")
        {
            alert("You don't have permission");
            return
        }
    try {
      console.log(scopeandstackId); 
      if(scopeandstackId==''){
         await Api.post(`/scopeandstake`, {
          scope: projectDetails["scope"],
          stake: projectDetails["stack"],
          project: {
            id: id
          }
        })
      }
      else{
        await Api.put(`/scopeandstake/${scopeandstackId}`, {
          scope: projectDetails["scope"],
          stake: projectDetails["stack"],
          project: {
            id: id
          }
        })
      }
      setChangesMade(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e, field) => {
    console.log(e, field);
    const newProjectDetails = { ...projectDetails };
    console.log(e.target.value);
    newProjectDetails[field] = e.target.value;
    console.log(newProjectDetails);
    setProjectDetails(newProjectDetails);
    setChangesMade(true);
  };

  const fetchData = async () => {
    try {
      const response = await Api.get("/scopeandstake");
      setProjectDetails(response?.data[0]);
      setScopeandstakeId(response?.data[0].id);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {changesMade && (
        <div className="save-button-container">
          <button onClick={handleSubmit} className="save-button">
            save
          </button>
        </div>
      )}
      <div className="scope-and-stack-wrapper">
        <div className="stack-wrapper">
          <label>Select Project's Technology</label>

          <select
            onChange={(e) => handleInputChange(e, "stack")}
            value={projectDetails?.stake}
            className="border w-full"
          >
            {[
              "backend",
              "frontend",
              "database",
              "mobile_app",
              "infrastructure_and_services",
            ].map((option) => (
              <option key={option} value={option}>
                {option.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="scope-wrapper">
          <label>Scope</label>
          <textarea
            className="border"
            value={projectDetails?.scope}
            onChange={(e) => handleInputChange(e, "scope")}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default ScopeAndStack;
