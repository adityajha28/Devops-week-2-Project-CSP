import React, { useEffect, useState } from "react";
import "monday-ui-react-core/tokens";
import "../styling/overview.css";
import Api from "../api/Api";
import { useParams } from "react-router-dom";

// Component for managing project overview
const OverView = () => {
  const { id } = useParams();
  // State variables for tracking changes, budget mode, and project details
  const [overviewId, setOverviewId] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [purpose, setPurpose] = useState('');
  const [goals, setGoals] = useState('');
  const [objectives, setObjectives] = useState('');
  const [budget, setBudget] = useState('');
  const userRole=localStorage.getItem("userRole");

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
  const handleBudget = (e) => {
    setBudget(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if( userRole=="Auditor" || userRole=="Client")
    {
        alert("You don't have permission");
        return
    }
    
    try {
      console.log("submit clicked");
      //bacekend functionality for this is remaining
      if (overviewId == '') {
        const data = await Api.post(`/projectoverviews`, {
          brief: projectBrief,
          purpose: purpose,
          objectives: objectives,
          budget: budget,
          goals: goals,
          project: {
            id: id
          }
        });
        console.log(data);
      }
      else {
        const data = await Api.put(`/projectoverviews/${overviewId}`, {
          brief: projectBrief,
          purpose: purpose,
          objectives: objectives,
          budget: budget,
          goals: goals,
          project: {
            id: id
          }
        });
        console.log(data);
      }
    } catch (error) { }
  };
  // Function to fetch data from the backend
  const fetchData = async () => {
    Api.get("/projectoverviews").then((response) => {
      setProjectBrief(response?.data[0]?.brief);
      setPurpose(response?.data[0]?.purpose)
      setObjectives(response.data[0]?.objectives)
      setBudget(response.data[0]?.budget);
      setGoals(response.data[0]?.goals);
      setOverviewId(response.data[0]?.id);
    }).catch((error) => {
      console.log(error);
    })
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
        <div className="mb-4">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            Budget
          </label>
          <input
            id="budget"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={budget}
            onChange={handleBudget}
            rows={4}
          />
        </div>
      </div>
    </>
  );
};





export default OverView;
