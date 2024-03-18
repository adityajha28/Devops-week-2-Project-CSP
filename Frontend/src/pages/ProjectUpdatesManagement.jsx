import React, { useState, useEffect } from "react";
import { Button, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from "monday-ui-react-core";
import Api from "../api/Api";
import { useParams } from "react-router-dom";

export default function ProjectUpdatesManagement() {
    const [projectUpdates, setProjectUpdates] = useState([]);
    const [editedRowIndex, setEditedRowIndex] = useState();
    const { id } = useParams();
    const userRole = localStorage.getItem("userRole");

    const tableHeaders = ['Date', 'General Updates', 'Action'];

    useEffect(() => {
        fetchProjectUpdates();
    }, []);

    const fetchProjectUpdates = async () => {
        try {
            const response = await Api.get("/projectupdates");
            setProjectUpdates(response.data);
        } catch (error) {
            console.error("Error fetching project updates:", error);
        }
    };

    const handleChange = (index, type, value) => {
        const updatedProjectUpdates = [...projectUpdates];
        updatedProjectUpdates[index][type] = value;
        setProjectUpdates(updatedProjectUpdates);
    };

    const handleSave = async (rowData) => {
        if((rowData?.date=='') || (rowData?.generalUpdates=='')){
            window.alert("Fill all values");
            return;
        }
        console.log(rowData);
        try {
            if (rowData.id) {
                await Api.put(`/projectupdates/${rowData.id}`, rowData);
            } else {
                await Api.post("/projectupdates", rowData);
            }
            setEditedRowIndex(-1);
            fetchProjectUpdates();
        } catch (error) {
            console.error("Error saving project update:", error);
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
                await Api.delete(`/projectupdates/${rowData.id}`);
            }
        } catch (error) {
            console.error("Error deleting project update:", error);
        } finally {
            const updatedProjectUpdates = [...projectUpdates];
            updatedProjectUpdates.splice(index, 1);
            setProjectUpdates(updatedProjectUpdates);
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
        setProjectUpdates([...projectUpdates, {
            id: null,
            project: {
                id: id
            },
            date: "",
            generalUpdates: ""
        }]);
    };

    return (
        <div>
            <DynamicTable
                tableHeaders={tableHeaders}
                projectUpdates={projectUpdates}
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

const DynamicTable = ({ tableHeaders, projectUpdates, handleAddRow, handleChange, handleDelete, editedRowIndex, handleEdit, handleSave }) => {
    return (
        <>
            <Button onClick={handleAddRow} className="w-20" style={{ marginBottom: "8px" }}>Add Row</Button>
            <Table columns={[
                { id: 'date', title: 'Date' },
                { id: 'generalUpdates', title: 'General Updates' },
                { id: 'action', title: 'Action' },
            ]}>
                <TableHeader>
                    {tableHeaders.map(header => (
                        <TableHeaderCell key={header} title={header} />
                    ))}
                </TableHeader>
                <TableBody>
                    {projectUpdates.map((row, index) =>
                        (
                            <TableRow key={index}>
                                <TableCell>
                                    <input
                                        type="date"
                                        value={row.date}
                                        onChange={(e) => handleChange(index, "date", e.target.value)}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        value={row.generalUpdates}
                                        onChange={(e) => handleChange(index, "generalUpdates", e.target.value)}
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
