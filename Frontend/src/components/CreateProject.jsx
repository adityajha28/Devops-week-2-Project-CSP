import React, { useEffect, useState } from 'react';
import './../styling/createproject.css';
import { Button } from 'monday-ui-react-core';
import Api from './Api';

const CreateProject = ({ showModal, setShowModal }) => {
    const [step, setStep] = useState(1);
    const [projectId, setProjectId] = useState(-1);
    const [formData, setFormData] = useState({
        projectName: '',
        projectDescription: '',
        clientName: '',
        clientEmail: '',
        projectManager: '',
    });

    useEffect(() => {
        setStep(1);
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
        //add project to client

        // change backend such that i get user my email then set projectid

        //add project to manager

        //add new user with manager .
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
            <div className="modal-content" >
                <div className='close-btn'>
                    <button className="delete-button" style={{ "width": "100px" }} onClick={() => setShowModal(false)} >Close</button>
                </div>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div>
                                <h2>Step 1: Project Details</h2>
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
                                <button type="button" onClick={handleNextStep}>
                                    Next
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <h2>Step 2: Client Details</h2>
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
                                <button type="button" onClick={handlePrevStep}>
                                    Previous
                                </button>
                                <button type="button" onClick={handleNextStep}>
                                    Next
                                </button>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <h2>Step 3: Project Manager</h2>
                                <label>Select Project Manager:</label>
                                <select
                                    name="projectManager"
                                    value={formData.projectManager}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Project Manager</option>
                                    <option value="John Doe">John Doe</option>
                                    <option value="Jane Smith">Jane Smith</option>
                                    <option value="Mike Johnson">Mike Johnson</option>
                                </select>
                                <button type="button" onClick={handlePrevStep}>
                                    Previous
                                </button>
                                <button type="submit">Submit</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;
