import React, { useState, useEffect } from "react";
import { Button, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from "monday-ui-react-core";
import Api from "../api/Api";
import { useParams } from "react-router-dom";

function ResourceManagement() {
    const [resources, setResources] = useState([]);
    const [editedRowIndex, setEditedRowIndex] = useState();
    const { id } = useParams();
    const userRole = localStorage.getItem("userRole");

    const tableHeaders = ['Resource Name', 'Role', 'Start Date', 'End Date', 'Comment', 'Action'];

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await Api.get("/resources");
            setResources(response.data);
        } catch (error) {
            console.error("Error fetching resources:", error);
        }
    };

    const handleChange = (index, type, value) => {
        const updatedResources = [...resources];
        updatedResources[index][type] = value;
        setResources(updatedResources);
    };

    const handleSave = async (rowData) => {
        if((rowData?.resourceName=='') || (rowData?.role=='')|| (rowData?.startDate=='')|| (rowData?.endDate=='')|| (rowData?.comment=='')){
            window.alert("Fill all values");
            return;
        }
        console.log(rowData);
        try {
            if (rowData.id) {
                await Api.put(`/resources/${rowData.id}`, rowData);
            } else {
                await Api.post("/resources", rowData);
            }
            setEditedRowIndex(-1);
            fetchResources();
        } catch (error) {
            console.error("Error saving resource:", error);
        }
    };

    const handleDelete = async (rowData, index) => {
        if (userRole === "Auditor" || userRole === "Client") {
            alert("You don't have permission");
            return;
        }
        try {
            const confirmation = window.confirm("Do you really want to delete it?");
            if (confirmation) {
                await Api.delete(`/resources/${rowData.id}`);
            }
        } catch (error) {
            console.error("Error deleting resource:", error);
        } finally {
            const updatedResources = [...resources];
            updatedResources.splice(index, 1);
            setResources(updatedResources);
        }
        setEditedRowIndex(-1);
    };

    const handleEdit = (index) => {
        if (userRole === "Auditor" || userRole === "Client") {
            alert("You don't have permission");
            return;
        }
        setEditedRowIndex(index);
    };

    const handleAddRow = () => {
        if (userRole === "Auditor" || userRole === "Client") {
            alert("You don't have permission");
            return;
        }
        setResources([...resources, {
            id: null,
            project: {
                id: id
            },
            resourceName: "",
            role: "",
            startDate: "",
            endDate: "",
            comment: ""
        }]);
    };

    return (
        <div>
            <DynamicTable
                tableHeaders={tableHeaders}
                resources={resources}
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

const DynamicTable = ({ tableHeaders, resources, handleAddRow, handleChange, handleDelete, editedRowIndex, handleEdit, handleSave }) => {
    return (
        <>
            <Button onClick={handleAddRow} className="w-20" style={{ marginBottom: "8px" }}>Add Row</Button>
            <Table columns={[
                { id: 'resourceName', title: 'Resource Name' },
                { id: 'role', title: 'Role' },
                { id: 'startDate', title: 'Start Date' },
                { id: 'endDate', title: 'End Date' },
                { id: 'comment', title: 'Comment' },
                { id: 'action', title: 'Action' },
            ]}>
                <TableHeader>
                    {tableHeaders.map(header => (
                        <TableHeaderCell key={header} title={header} />
                    ))}
                </TableHeader>
                <TableBody>
                    {resources.map((row, index) =>
                        (
                            <TableRow key={index}>
                                <TableCell>
                                    <input
                                        type="text"
                                        value={row.resourceName}
                                        onChange={(e) => handleChange(index, "resourceName", e.target.value)}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        value={row.role}
                                        onChange={(e) => handleChange(index, "role", e.target.value)}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="date"
                                        value={row.startDate}
                                        onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="date"
                                        value={row.endDate}
                                        onChange={(e) => handleChange(index, "endDate", e.target.value)}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        value={row.comment}
                                        onChange={(e) => handleChange(index, "comment", e.target.value)}
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
        </>
    );
};

export default ResourceManagement;



















