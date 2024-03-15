import React, { useState, useEffect } from "react";
import { Button, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from "monday-ui-react-core";
import Api from "../api/Api";
import { useParams } from "react-router-dom";

export default function Stakeholders() {
    const [stakeholders, setStakeholders] = useState([]);
    const [editedRowIndex, setEditedRowIndex] = useState();
    const { id } = useParams();
    const userRole=localStorage.getItem("userRole");

    const tableHeaders = ['Title', 'Name', 'Contact', 'Action'];

    useEffect(() => {
        fetchStakeholders();
    }, []);

    const fetchStakeholders = async () => {
        try {
            const response = await Api.get("/stakeholders");
            setStakeholders(response.data);
        } catch (error) {
            console.error("Error fetching stakeholders:", error);
        }
    };

    const handleChange = (index, type, value) => {
        const updatedStakeholders = [...stakeholders];
        updatedStakeholders[index][type] = value;
        setStakeholders(updatedStakeholders);
    };

    const handleSave = async (rowData) => {
        try {
            console.log("newdata",rowData);
            setEditedRowIndex(-1);
            if (rowData.id) {
                await Api.put(`/stakeholders/${rowData.id}`, rowData);
            } else {
                await Api.post("/stakeholders", rowData);
            }
            
            fetchStakeholders();
        } catch (error) {
            console.error("Error saving stakeholder:", error);
        }
    };

    const handleDelete = async (rowData, index) => {
        if( userRole=="Client")
        {
            alert("You don't have permission");
            return
        }
        try {
            const confirmation = window.confirm("Do you really want to delete it?");
            if (confirmation) {
                await Api.delete(`/stakeholders/${rowData.id}`);
                const updatedStakeholders = [...stakeholders];
                updatedStakeholders.splice(index, 1);
                setStakeholders(updatedStakeholders);
            }
        } catch (error) {
            console.error("Error deleting stakeholder:", error);
        }
        setEditedRowIndex(-1);
    };

    const handleEdit = (index) => {
        if( userRole=="Client")
        {
            alert("You don't have permission");
            return
        }
        setEditedRowIndex(index);
    };

    const handleAddRow = () => {
        setStakeholders([...stakeholders, {
            title: "",
            name: "",
            contact: "",
            project: {
                id: id
            }
        }]);
    };

    return (
        <div>
            <DynamicTable
                tableHeaders={tableHeaders}
                stakeholders={stakeholders}
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

const DynamicTable = ({ tableHeaders, stakeholders, handleAddRow, handleChange, handleDelete, editedRowIndex, handleEdit, handleSave,projectId }) => {
    useEffect(() => {
    }, [Stakeholders])
    return (
        <>
            <Button onClick={handleAddRow}  className="w-20" style={{ marginBottom: "8px" }}>Add Row</Button>
            <Table columns={[
                { id: 'title', title: 'Title' },
                { id: 'name', title: 'Name' },
                { id: 'contact', title: 'Contact' },
                { id: 'action', title: 'Action' },
            ]}>
                <TableHeader>
                    {tableHeaders.map(header => (
                        <TableHeaderCell key={header} title={header} />
                    ))}
                </TableHeader>
                <TableBody>
                    {stakeholders.map((row, index) => 
                    row?.project?.id == projectId ?
                    (
                        <TableRow key={index}>
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.title}
                                    style={{ "border": "none" }}
                                    onChange={(e) => handleChange(index, "title", e.target.value)}
                                    readOnly={editedRowIndex !== index}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.name}
                                    style={{ "border": "none" }}
                                    onChange={(e) => handleChange(index, "name", e.target.value)}
                                    readOnly={editedRowIndex !== index}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.contact}
                                    style={{ "border": "none" }}
                                    onChange={(e) => handleChange(index, "contact", e.target.value)}
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
