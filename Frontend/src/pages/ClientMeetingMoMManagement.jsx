import React, { useState, useEffect } from "react";
import { Button, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from "monday-ui-react-core";
import Api from "../api/Api";
import { useParams } from "react-router-dom";

export default function ClientMeetingMoMManagement() {
    const [clientMeetingMoMs, setClientMeetingMoMs] = useState([]);
    const [editedRowIndex, setEditedRowIndex] = useState();
    const { id } = useParams();
    const userRole = localStorage.getItem("userRole");

    const tableHeaders = ['Meeting Date', 'Duration', 'MOM Link', 'Comments', 'Action'];

    useEffect(() => {
        fetchClientMeetingMoMs();
    }, []);

    const fetchClientMeetingMoMs = async () => {
        try {
            const response = await Api.get("/clientmeetingmoms");
            setClientMeetingMoMs(response.data);
        } catch (error) {
            console.error("Error fetching client meeting MoMs:", error);
        }
    };

    const handleChange = (index, type, value) => {
        const updatedClientMeetingMoMs = [...clientMeetingMoMs];
        updatedClientMeetingMoMs[index][type] = value;
        setClientMeetingMoMs(updatedClientMeetingMoMs);
    };

    const handleSave = async (rowData) => {
        console.log(rowData);
        if((rowData?.meetingDate=='') || (rowData?.duration=='') || (rowData?.momLink=='') || (rowData?.comments=='')){
            window.alert("Fill all values");
            return;
        }

        console.log(rowData);
        try {
            if (rowData.id) {
                await Api.put(`/clientmeetingmoms/${rowData.id}`, rowData);
            } else {
                await Api.post("/clientmeetingmoms", rowData);
            }
            setEditedRowIndex(-1);
            fetchClientMeetingMoMs();
        } catch (error) {
            console.error("Error saving client meeting MoM:", error);
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
                await Api.delete(`/clientmeetingmoms/${rowData.id}`);
            }
        } catch (error) {
            console.error("Error deleting client meeting MoM:", error);
        } finally {
            const updatedClientMeetingMoMs = [...clientMeetingMoMs];
            updatedClientMeetingMoMs.splice(index, 1);
            setClientMeetingMoMs(updatedClientMeetingMoMs);
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
        setClientMeetingMoMs([...clientMeetingMoMs, {
            id: null,
            project: {
                id: id
            },
            meetingDate: "",
            duration: "",
            momLink: "",
            comments: ""
        }]);
    };

    return (
        <div>
            <DynamicTable
                tableHeaders={tableHeaders}
                clientMeetingMoMs={clientMeetingMoMs}
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

const DynamicTable = ({ tableHeaders, clientMeetingMoMs, handleAddRow, handleChange, handleDelete, editedRowIndex, handleEdit, handleSave }) => {
    return (
        <>
            <Button onClick={handleAddRow} className="w-20" style={{ marginBottom: "8px" }}>Add Row</Button>
            <Table columns={[
                { id: 'meetingDate', title: 'Meeting Date' },
                { id: 'duration', title: 'Duration' },
                { id: 'momLink', title: 'MOM Link' },
                { id: 'comments', title: 'Comments' },
                { id: 'action', title: 'Action' },
            ]}>
                <TableHeader>
                    {tableHeaders.map(header => (
                        <TableHeaderCell key={header} title={header} />
                    ))}
                </TableHeader>
                <TableBody>
                    {clientMeetingMoMs.map((row, index) =>
                        (
                            <TableRow key={index}>
                                <TableCell>
                                    <input
                                        type="date"
                                        value={row.meetingDate}
                                        onChange={(e) => handleChange(index, "meetingDate", e.target.value)}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        value={row.duration}
                                        onChange={(e) => handleChange(index, "duration", e.target.value)}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        value={row.momLink}
                                        onChange={(e) => handleChange(index, "momLink", e.target.value)}
                                        readOnly={editedRowIndex !== index}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        value={row.comments}
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
                        ))}
                </TableBody>
            </Table>
        </>
    );
};
