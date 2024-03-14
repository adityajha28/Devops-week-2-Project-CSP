import React, { useState, useEffect } from "react";
import { Button, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from "monday-ui-react-core";
import Api from "./Api";
import { useParams } from "react-router-dom";
// Component for managing risk profiling
export default function RiskProfiling() {
    // State variables for risk profiles and edited row index
    const [riskProfiles, setRiskProfiles] = useState([]);
    const [editedRowIndex, setEditedRowIndex] = useState();
    const { id } = useParams();
    const userRole=localStorage.getItem("userRole");
    // Table headers for risk profiles table
    const tableHeaders = ['Risk Type', 'Description', 'Severity', 'Impact', 'Remedial Steps', 'Status', 'Closure Date', 'Action'];

    useEffect(() => {
        fetchRiskProfiles();
    }, []);
 // Function to fetch risk profiles data from the API
    const fetchRiskProfiles = async () => {
        try {
            const response = await Api.get("/riskprofilings");
            setRiskProfiles(response.data);
        } catch (error) {
            console.error("Error fetching risk profiles:", error);
        }
    };
 // Function to handle changes in risk profile data
    const handleChange = (index, type, value) => {
        const updatedRiskProfiles = [...riskProfiles];
        updatedRiskProfiles[index][type] = value;
        setRiskProfiles(updatedRiskProfiles);
    };
// Function to save risk profile data
    const handleSave = async (rowData) => {
       
        try {
            if (rowData.id) {
                await Api.put(`/riskprofilings/${rowData.id}`, rowData);
            } else {
                await Api.post("/riskprofilings", rowData);
            }
            setEditedRowIndex(-1);
            fetchRiskProfiles();
        } catch (error) {
            console.error("Error saving risk profile:", error);
        }
    };

    // Function to delete risk profile data
    const handleDelete = async (rowData, index) => {
        if( userRole=="Auditor")
        {
            alert("You don't have permission");
            return
        }
        try {
            const confirmation = window.confirm("Do you really want to delete it?");
            if (confirmation) {
                await Api.delete(`/riskprofilings/${rowData.id}`);
                const updatedRiskProfiles = [...riskProfiles];
                updatedRiskProfiles.splice(index, 1);
                setRiskProfiles(updatedRiskProfiles);
            }
        } catch (error) {
            console.error("Error deleting risk profile:", error);
        }
        setEditedRowIndex(-1);
    };

    // Function to handle edit action
    const handleEdit = (index) => {
        if( userRole=="Auditor")
        {
            alert("You don't have permission");
            return
        }
        setEditedRowIndex(index);
    };

    // Function to add a new row for risk profiles
    const handleAddRow = () => {
        if( userRole=="Auditor")
        {
            alert("You don't have permission");
            return
        }
        setRiskProfiles([...riskProfiles, {
            id: null,
            riskType: "",
            description: "",
            severity: "",
            impact: "",
            remedialSteps: "",
            status: "",
            closureDate: "",
            project: {
                id: id
            }
        }]);
    };

    return (
        <div>
            <DynamicTable
                tableHeaders={tableHeaders}
                riskProfiles={riskProfiles}
                handleChange={handleChange}
                handleDelete={handleDelete}
                handleAddRow={handleAddRow}
                editedRowIndex={editedRowIndex}
                handleEdit={handleEdit}
                handleSave={handleSave}
                projectId={id}
            />
        </div>
    );
}
// Dynamic Table component to render the risk profiles table
const DynamicTable = ({ tableHeaders, riskProfiles, handleAddRow, handleChange, handleDelete, editedRowIndex, handleEdit, handleSave ,projectId }) => {
    useEffect(() => {
    }, [RiskProfiling])
    return (
        <>
            <Button onClick={handleAddRow}  className="w-20" style={{ marginBottom: "8px" }}>Add Row</Button>
            <Table columns={[
                { id: 'riskType', title: 'Risk Type' },
                { id: 'description', title: 'Description' },
                { id: 'severity', title: 'Severity' },
                { id: 'impact', title: 'Impact' },
                { id: 'remedialSteps', title: 'Remedial Steps' },
                { id: 'status', title: 'Status' },
                { id: 'closureDate', title: 'Closure Date' },
                { id: 'action', title: 'Action' },
            ]}>
                <TableHeader>
                    {tableHeaders.map(header => (
                        <TableHeaderCell key={header} title={header} />
                    ))}
                </TableHeader>
                <TableBody>
                    {riskProfiles.map((row, index) => 
                     row?.project?.id == projectId ?
                    (
                        <TableRow key={index}>
                            <TableCell>
                                
                                 <select
                                    onChange={(e) => handleChange(index, "riskType",  e.target.value)}
                                    value={row.riskType}
                                    readOnly={editedRowIndex !== index}
                                    className="border-none w-full"
                                >
                                    <option value="finacial">Financial</option>
                                    <option value="operation">Operational</option>
                                    <option value="technical">Technical</option>
                                    <option value="HR">HR</option> 
                                    <option value="External">External</option>    
                                </select>
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.description}
                                    style={{ "border": "none" }}
                                    onChange={(e) => handleChange(index, "description", e.target.value)}
                                    readOnly={editedRowIndex !== index}
                                />
                            </TableCell>
                            <TableCell>
                                
                                  <select
                                    onChange={(e) => handleChange(index, "severity",  e.target.value)}
                                    value={row.severity}
                                    readOnly={editedRowIndex !== index}
                                    className="border-none w-full"
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                    
                                </select>
                            </TableCell>
                            <TableCell>
                            
                                <select
                                    onChange={(e) => handleChange(index, "impact",  e.target.value)}
                                    value={row.impact}
                                    readOnly={editedRowIndex !== index}
                                    className="border-none w-full"
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                    
                                </select>
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.remedialSteps}
                                    style={{ "border": "none" }}
                                    onChange={(e) => handleChange(index, "remedialSteps", e.target.value)}
                                    readOnly={editedRowIndex !== index}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.status}
                                    style={{ "border": "none" }}
                                    onChange={(e) => handleChange(index, "status", e.target.value)}
                                    readOnly={editedRowIndex !== index}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="date"
                                    value={row.closureDate}
                                    style={{ "border": "none" }}
                                    onChange={(e) => handleChange(index, "closureDate", e.target.value)}
                                    readOnly={editedRowIndex !== index}
                                />
                            </TableCell>
                            <TableCell>
                                {editedRowIndex !== index ? (
                                    <>
                                        <button onClick={() => handleEdit(index)}>Edit</button>
                                        <button onClick={() => handleDelete(row, index)}>Delete</button>
                                    </>
                                ) : (
                                    <button onClick={() => handleSave(row)}>Save</button>
                                )}
                            </TableCell>
                        </TableRow>
                    ):null)}
                </TableBody>
            </Table>
        </>
    );
};
