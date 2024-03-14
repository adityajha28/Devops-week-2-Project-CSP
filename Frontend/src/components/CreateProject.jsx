import React, { useEffect, useState } from 'react';
import './../styling/createproject.css';
import { Button } from 'monday-ui-react-core';
import Api from './Api';

const CreateProject = ({ showModal, setShowModal }) => {
    const [step, setStep] = useState(1);
    const [projectId, setProjectId] = useState(-1);
    const userRole = localStorage.getItem("userRole");
    const [projectManagers, setProjectManager] = useState([]);
    const [formData, setFormData] = useState({
        projectName: '',
        projectDescription: '',
        clientName: '',
        clientEmail: '',
        projectManager: '',
    });

    const fetchProjectManager = async () => {
        const tempprojectManagers = [];
        await Api.get("/application-user").then((res) => {
            res?.data?.map((e) => {
                if (e?.role == "ProjectManager") {
                    tempprojectManagers.push(e.name);
                }
            })
        })
        setProjectManager(tempprojectManagers);
    }
    useEffect(() => {
        setStep(1);
        fetchProjectManager();
        setFormData({
            projectName: '',
            projectDescription: '',
            clientName: '',
            clientEmail: '',
            projectManager: '',
        })

    }, [showModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., send data to backend)
        //add project to client
        await Api.post("/project", { name: formData.projectName, description: formData.projectDescription }).then((e) => {
            console.log(e.data.id);
            setProjectId(e.data?.id);
            Api.put(`/application-user/${formData.clientEmail}`, {
                name: formData.clientName, email: formData.clientEmail, role: "Client", project: {
                    "id": e.data?.id
                }
            }).then((e) => {
                console.log(e);
            }).catch((e) => {
                console.log(e);
            })
        }).catch((e) => {
            console.log(e);
        })
        console.log('Form submitted:', formData);
        // Reset form data and step after submission
        setFormData({
            projectName: '',
            projectDescription: '',
            clientName: '',
            clientEmail: '',
            projectManager: '',
        });
        setStep(1);
        setShowModal(false); // Close the modal after form submission
    };

    return (
        <div className={`modal ${showModal ? '' : 'hidden'}`}>
            <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
            <div className="modal-content">
                <div className='close-btn'>
                    <button className="delete-button" style={{ "width": "100px" }} onClick={() => setShowModal(false)}>Close</button>
                </div>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div>
                                <label>Project Name:</label>
                                <input
                                    type="text"
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleChange}
                                />
                                <label>Project Description:</label>
                                <input
                                    type="text"
                                    name="projectDescription"
                                    value={formData.projectDescription}
                                    onChange={handleChange}
                                />
                                <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' type="button" onClick={handleNextStep}>
                                    Next
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <label>Client Name:</label>
                                <input
                                    type="text"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleChange}
                                />
                                <label>Client Email:</label>
                                <input
                                    type="email"
                                    name="clientEmail"
                                    value={formData.clientEmail}
                                    onChange={handleChange}
                                />
                                <button className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded' type="button" onClick={handlePrevStep}>
                                    Previous
                                </button>
                                <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' type="button" onClick={handleNextStep}>
                                    Next
                                </button>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <label>Select Project Manager:</label>
                                <select
                                    name="projectManager"
                                    value={formData.projectManager}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Project Manager</option>
                                    {projectManagers.map((manager, index) => (
                                        <option key={index} value={manager}>{manager}</option>
                                    ))}
                                </select>
                                <button className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded' type="button" onClick={handlePrevStep}>
                                    Previous
                                </button>
                                <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' type="submit">
                                    Submit
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>

    );
};

export default CreateProject;
