import React, { useState, useEffect } from "react";
import { Button, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from "monday-ui-react-core";
import Api from "./Api";// Import API utility for making HTTP requests

//component for audit history
export default function AuditHistoryComponent() {
    const [history, setHistory] = useState([]); // State variable for storing audit history data
    const [editedRowIndex, setEditedRowIndex] = useState(); // State variable to track the index of the row being edited

    const tableHeaders = ['Date of Audit', 'Reviewed By', 'Status', 'Reviewed Section', 'Comment Queries', 'Action Item','Action'];
 // Effect hook to fetch audit history data from the API when the component mounts
    useEffect(() => {
        fetchAuditHistory();
    }, []);

    const fetchAuditHistory = async () => {
        // Function to fetch audit history data from the API
        try {
            const response = await Api.get("/audithistory");// Send GET request to the audithistory endpoint
            setHistory(response.data);// Set the fetched audit history data to the state variable
        } catch (error) {
            console.error("Error fetching audit history:", error);// Log any errors that occur during the fetch operation

        }
    };

    const handleChange = (index, type, value) => {
                // Function to handle changes in input fields

        const updatedHistory = [...history]; // Create a copy of the audit history data
        updatedHistory[index][type] = value;// Update the specific field in the copied data array
        setHistory(updatedHistory);// Update the state variable with the modified data
    };

    const handleSave = async (rowData) => {
        
     // Function to handle saving edited or new audit history data
        try {
            setEditedRowIndex(-1);// Reset the edited row index
            if (rowData.id) {
                await Api.put(`/audithistory/${rowData.id}`, rowData);// If the row has an ID, update it via PUT request
            } else {
                await Api.post("/audithistory", rowData);// If the row does not have an ID, create it via POST request
            
            }
            fetchAuditHistory();    
        } catch (error) {
            console.error("Error saving audit history:", error);
        }
    };

    const handleDelete = async (rowData, index) => {
        try {
            const confirmation = window.confirm("Do you really want to delete it?");
            if (confirmation) {
                await Api.delete(`/audithistory/${rowData.id}`);
                const updatedHistory = [...history];
                updatedHistory.splice(index, 1);
                setHistory(updatedHistory);
            }
        } catch (error) {
            console.error("Error deleting audit history:", error);
        }
        setEditedRowIndex(-1);
    };

    const handleEdit = (index) => {
        setEditedRowIndex(index);
    };

    const handleAddRow = () => {
        setHistory([...history, {
            id: null,
            dateOfAudit: "",
            reviewedBy: "",
            status: "",
            reviewedSection: "",
            commentQueries: "",
            actionItem: ""
        }]);
    };

    return (
        <div>
            <DynamicTable
                tableHeaders={tableHeaders}
                history={history}
                handleChange={handleChange}
                handleDelete={handleDelete}
                handleAddRow={handleAddRow}
                editedRowIndex={editedRowIndex}
                handleEdit={handleEdit}
                handleSave={handleSave}
            />
        </div>
    );
}

const DynamicTable = ({ tableHeaders, history, handleAddRow, handleChange, handleDelete, editedRowIndex, handleEdit, handleSave }) => {
    return (
        <>
            <Button onClick={handleAddRow} style={{ marginBottom: "8px" }}>Add Row</Button>
            <div>
                <Table columns={tableHeaders}>
                    <TableHeader>
                        {
                            tableHeaders.map(element => {
                                return <TableHeaderCell title={element} />
                            })
                        }
                    </TableHeader>
                    <TableBody>
                        {history.map((row, index) => (
                            <TableRow key={index}>

                                <TableCell >
                                    <input
                                        onChange={(e) => handleChange(index, "dateOfAudit", e.target.value)}
                                        type="date" style={{ "border": "none" }} value={row?.dateOfAudit}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell >
                                    <input
                                        onChange={(e) => handleChange(index, "reviewedBy", e.target.value)}
                                        type="text" style={{ "border": "none" }} value={row?.reviewedBy}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell >
                                    <input
                                        onChange={(e) => handleChange(index, "status", e.target.value)}
                                        type="text" style={{ "border": "none" }} value={row?.status}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell >
                                    <input
                                        onChange={(e) => handleChange(index, "reviewedSection", e.target.value)}
                                        type="text" style={{ "border": "none" }} value={row?.reviewedSection}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell >
                                    <input
                                        onChange={(e) => handleChange(index, "commentQueries", e.target.value)}
                                        type="text" style={{ "border": "none" }} value={row?.commentQueries}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell >
                                    <input
                                        onChange={(e) => handleChange(index, "actionItem", e.target.value)}
                                        type="text" style={{ "border": "none" }} value={row?.actionItem}
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
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};
