import React, { useEffect, useState } from "react";
import { Dropdown } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import "../styling/overview.css";
import axios from "axios";

// Component for managing project overview
const OverView = () => {
  // State variables for tracking changes, budget mode, and project details
  const [changesMade, setChangesMade] = useState(false);
  const [projectBrief, setProjectBrief] = useState('');
  const [purpose, setPurpose] = useState('');
  const [goals, setGoals] = useState('');
  const [objectives, setObjectives] = useState('');
  

  const handleProjectBriefChange = (e) => {
    setProjectBrief(e.target.value);
  };

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  const handleGoalsChange = (e) => {
    setGoals(e.target.value);
  };

  const handleObjectivesChange = (e) => {
    setObjectives(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      console.log("submit clicked");
      //bacekend functionality for this is remaining
      const { data } = await axios.post(
        "http://localhost:8081/project/project_details",// still not created endpoint for this it is random endpoint 
        {
          projectDetails,
        }
      );
      setChangesMade(false);
      console.log(data);
    } catch (error) { }
  };
  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/project/project_details"
      );

      const { data } = await response.json();
      setProjectDetails(data[0]);
      console.log("overview", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>

      <div className="w-20 bg-blue">
        <button onClick={handleSubmit} className="">
          save
        </button>
      </div>
      <div className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="projectBrief" className="block text-sm font-medium text-gray-700">
            Project Brief
          </label>
          <textarea
            id="projectBrief"
            className="mt-1 border block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={projectBrief}
            onChange={handleProjectBriefChange}
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
            Purpose
          </label>
          <textarea
            id="purpose"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={purpose}
            onChange={handlePurposeChange}
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
            Goals
          </label>
          <textarea
            id="goals"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={goals}
            onChange={handleGoalsChange}
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">
            Objectives
          </label>
          <textarea
            id="objectives"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={objectives}
            onChange={handleObjectivesChange}
            rows={4}
          />
        </div>
      </div>
    </>
  );
};





export default OverView;
