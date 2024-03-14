import React, { useState, useEffect } from "react";
import { Button, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from "monday-ui-react-core";
import Api from "../Api";
import { useParams } from "react-router-dom";

// Component for managing phase 
export default function PhaseMilestones() {
     // State variables for milestones and edited row index
    const [milestones, setMilestones] = useState([]);
    const [editedRowIndex, setEditedRowIndex] = useState();
    const { id } = useParams();
 // Headers for the table
    const tableHeaders = ['Title', 'Start Date', 'Completion Date', 'Approval Date', 'Status', 'Revised Completion Date', 'Comments', 'Action'];
 // Fetch milestones on component mount
    useEffect(() => {
        fetchMilestones();
    }, []);
 // Fetch milestones from the API
    const fetchMilestones = async () => {
        try {
            const response = await Api.get("/phasemilestones");
            setMilestones(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching milestones:", error);
        }
    };
     // Handle change in milestone data
    const handleChange = (index, type,value) => {

        const updatedMilestones = [...milestones];
        updatedMilestones[index][type] = value;
        console.log(updatedMilestones)
        setMilestones(updatedMilestones);
    };
 // Handle saving milestone data
    const handleSave = async (rowData) => {
        try {
            setEditedRowIndex(-1);
            if (rowData.id) {
                await Api.put(`/phasemilestones/${rowData.id}`, rowData);
            } else {
                await Api.post("/phasemilestones", rowData);
            }
           
            fetchMilestones();
        } catch (error) {
            console.error("Error saving milestone:", error);
        }
    };
     // Handle deleting a milestone
    const handleDelete = async (rowData, index) => {
        try {
            const confirmation = window.confirm("Do you really want to delete it?");
            if (confirmation) {
                await Api.delete(`/phasemilestones/${rowData.id}`);
                const updatedMilestones = [...milestones];
                updatedMilestones.splice(index, 1);
                setMilestones(updatedMilestones);
            }
        } catch (error) {
            console.error("Error deleting milestone:", error);
        }
        setEditedRowIndex(-1);
    };
        // Handle editing a milestone

    const handleEdit = (index) => {
        setEditedRowIndex(index);
    };
    
    // Handle adding a new row for a milestone
    const handleAddRow = () => {
        setMilestones([...milestones, {
            id: null,
            title: "",
            startDate: "",
            completionDate: "",
            approvalDate: "",
            status: "",
            revisedCompletionDate: "",
            comments: "",
            project: {
                id: id
            }
        }]);
    };
    // Render the component

    return (
        <div>
            <DynamicTable
                tableHeaders={tableHeaders}
                milestones={milestones}
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
// Component for rendering dynamic table

const DynamicTable = ({ tableHeaders, milestones, handleAddRow, handleChange, handleDelete, editedRowIndex, handleEdit, handleSave , projectId}) => {
    useEffect(() => {
    }, [milestones])
// Render the dynamic table
    return (
        <>
            <Button onClick={handleAddRow} style={{ marginBottom: "8px" }}>Add Row</Button>
            <Table columns={[
                    { id: 'title', loadingStateType: 'long-text', title: 'Title' },
                    { id: 'startDate', loadingStateType: 'long-text', title: 'Start Date' },
                    { id: 'completionDate', loadingStateType: 'long-text', title: 'Completion Date' },
                    { id: 'status', loadingStateType: 'long-text', title: 'Status' },
                    { id: 'revisedCompletionDate', loadingStateType: 'long-text', title: 'Revised Completion Date' },
                    { id: 'comments', loadingStateType: 'long-text', title: 'Comments' },
                    { id: 'action', loadingStateType: 'long-text', title: 'Action' },
                ]}>
                    <TableHeader>
                        <TableHeaderCell title="Title" />
                        <TableHeaderCell title="Start Date" />
                        <TableHeaderCell title="Completion Date" />
                        <TableHeaderCell title="Status" />
                        <TableHeaderCell title="Revised Completion Date" />
                        <TableHeaderCell title="Comments" />
                        <TableHeaderCell title="Action" />
                    </TableHeader>
                    <TableBody>
                        {milestones.map((row, index) => 
                         row?.project?.id == projectId ? 
                         (
                            <TableRow key={index}>
                                <TableCell>
                                    <input
                                        onChange={(e) => handleChange(index, "title", e.target.value)}
                                        type="text" style={{ "border": "none" }} value={row.title}
                                        readOnly={editedRowIndex != index}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                        type="date" style={{ "border": "none" }} value={row.startDate}
                                        readOnly={editedRowIndex != index}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        onChange={(e) => handleChange(index, "completionDate", e.target.value)}
                                        type="date" style={{ "border": "none" }} value={row.completionDate}
                                        readOnly={editedRowIndex != index}
                                    />
                                </TableCell>
                                <TableCell>
            
                                   <select
                                    onChange={(e) => handleChange(index, "status", e.target.value)}
                                    value={row.status}
                                    readOnly={editedRowIndex != index}
                                    className="border-none w-full"
                                >
                                    <option value="Delayed">Delayed</option>
                                    <option value="On-time">On-time</option>
                                    <option value="Sign-off">Sign-of</option>
    
                                    <option value="Signed-off Pending">Signed-off Pending</option>
                                </select>
                                </TableCell>
                                <TableCell>
                                    <input
                                        onChange={(e) => handleChange(index, "revisedCompletionDate", e.target.value)}
                                        type="date" style={{ "border": "none" }} value={row.revisedCompletionDate}
                                        readOnly={editedRowIndex != index}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        onChange={(e) => handleChange(index, "comments", e.target.value)}
                                        type="text" style={{ "border": "none" }} value={row.comments}
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
