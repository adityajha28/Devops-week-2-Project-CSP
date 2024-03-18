import React, { useState, useEffect } from "react";
import { Button, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from "monday-ui-react-core";
import Api from "../api/Api";
import { useParams } from "react-router-dom";
// SprintDetails component for managing sprint details
export default function SprintDetails() {
    // State variables for sprint details and edited row index
    const [sprintDetails, setSprintDetails] = useState([]);
    const [editedRowIndex, setEditedRowIndex] = useState();
    const { id } = useParams();
    const userRole=localStorage.getItem("userRole");
// Define table headers
    const tableHeaders = ['Sprint Number', 'Start Date', 'End Date', 'Status', 'Comments', 'Action'];
  // Fetch sprint details on component mount
    useEffect(() => {
        fetchSprintDetails();
    }, []);
 // Function to fetch sprint details
    const fetchSprintDetails = async () => {
        try {
            const response = await Api.get("/sprintdetails");
            setSprintDetails(response.data);
        } catch (error) {
            console.error("Error fetching sprint details:", error);
        }
    };
 // Function to handle change in sprint details
    const handleChange = (index, type, value) => {
        const updatedSprintDetails = [...sprintDetails];
        updatedSprintDetails[index][type] = value;
        setSprintDetails(updatedSprintDetails);
    };
  // Function to save sprint detail
    const handleSave = async (rowData) => {

        console.log(rowData);
        if((rowData?.sprintNumber=='') || (rowData?.startDate=='') || (rowData?.endDate=='') || (rowData?.status=='') || (rowData?.comments=='')){
            window.alert("Fill all values");
            return;
        }
        try {
            setEditedRowIndex(-1);
            if (rowData.id) {
                await Api.put(`/sprintdetails/${rowData.id}`, rowData);
            } else {
                await Api.post("/sprintdetails", rowData);
            }
            
            fetchSprintDetails();
        } catch (error) {
            console.error("Error saving sprint detail:", error);
        }
    };

    // Function to delete sprint detail
    const handleDelete = async (rowData, index) => {
        if( userRole=="Auditor"||userRole=="Client")
        {
            alert("You don't have permission");
            return
        }
        try {
            const confirmation = window.confirm("Do you really want to delete it?");
            if (confirmation) {
                await Api.delete(`/sprintdetails/${rowData.id}`);
               
            }
        } catch (error) {
            console.error("Error deleting sprint detail:", error);
        }
        finally{
            const updatedSprintDetails = [...sprintDetails];
            updatedSprintDetails.splice(index, 1);
            setSprintDetails(updatedSprintDetails);
        }
        setEditedRowIndex(-1);
    };
// Function to handle edit of sprint detail
    const handleEdit = (index) => {
        if( userRole=="Auditor"||userRole=="Client")
        {
            alert("You don't have permission");
            return
        }
        setEditedRowIndex(index);
    };
// Function to add a new row for sprint detail
    const handleAddRow = () => {
        if( userRole=="Auditor"||userRole=="Client")
        {
            alert("You don't have permission");
            return
        }
        setSprintDetails([...sprintDetails, {
            id: null,
            sprintNumber: "",
            startDate: "",
            endDate: "",
            status: "",
            comments: "",
            project: {
                id: id
            }
        }]);
    };

    return (
        <div>
            <DynamicTable
                tableHeaders={tableHeaders}
                sprintDetails={sprintDetails}
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
// DynamicTable component for rendering dynamic table with sprint details
const DynamicTable = ({ tableHeaders, sprintDetails, handleAddRow, handleChange, handleDelete, editedRowIndex, handleEdit, handleSave ,projectId }) => {
    useEffect(() => {
    }, [SprintDetails])
    return (
        <>
            <Button onClick={handleAddRow}  className="w-20" style={{ marginBottom: "8px" }}>Add Row</Button>
            <Table columns={[
                { id: 'sprintNumber', title: 'Sprint Number' },
                { id: 'startDate', title: 'Start Date' },
                { id: 'endDate', title: 'End Date' },
                { id: 'status', title: 'Status' },
                { id: 'comments', title: 'Comments' },
                { id: 'action', title: 'Action' },
            ]}>
                <TableHeader>
                    {tableHeaders.map(header => (
                        <TableHeaderCell key={header} title={header} />
                    ))}
                </TableHeader>
                <TableBody>
                    {sprintDetails.map((row, index) =>
                      row?.project?.id == projectId ?
                    (
                        <TableRow key={index}>
                            <TableCell>
                                <input
                                    type="number"
                                    value={row.sprintNumber}
                                    style={{ "border": "none" }}
                                    onChange={(e) => handleChange(index, "sprintNumber", e.target.value)}
                                    readOnly={editedRowIndex !== index}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="date"
                                    value={row.startDate}
                                    style={{ "border": "none" }}
                                    onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                    readOnly={editedRowIndex !== index}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="date"
                                    value={row.endDate}
                                    style={{ "border": "none" }}
                                    onChange={(e) => handleChange(index, "endDate", e.target.value)}
                                    readOnly={editedRowIndex !== index}
                                />
                            </TableCell>
                            <TableCell>
                        
                                  <select
                                    onChange={(e) => handleChange(index, "status", e.target.value)}
                                    value={row.status}
                                    readOnly={editedRowIndex != index}
                                    className="border-none w-full"
                                >
                                    <option selected={true} disabled={true} value=''> Status Type: </option>
                                    <option value="Delayed">Delayed</option>
                                    <option value="On-time">On-time</option>
                                    <option value="Sign-off">Sign-of</option>
    
                                    <option value="Signed-off Pending">Signed-off Pending</option>
                                </select>
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.comments}
                                    style={{ "border": "none" }}
                                    onChange={(e) => handleChange(index, "comments", e.target.value)}
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
