import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell, Label, Button } from "monday-ui-react-core";
import Api from "../api/Api";// Importing API utility for making HTTP requests
import { useParams } from "react-router-dom";


export default function EscalationMatrix() {
    const [data, setData] = useState([]);// State variable for storing data fetched from the API
    const [editedRowIndex, setEditedRowIndex] = useState(-1);// State variable to track the index of the row being edited
    const { id } = useParams();
    const userRole=localStorage.getItem("userRole");
    const tableNames = ['Escalation Level', 'Role', 'Name', 'Type', 'Action']; // Array containing table column names


    const fetchData = async () => {
        await Api.get("/escalation-matrix").then((res) => {
            console.log(res.data);
            // Fetch data from the API endpoint
            setData(res.data);
        })
    }
    useEffect(() => {
        // Effect hook to fetch data from the API when the component mounts
        fetchData();
    }, []);

    const handleChange = (value, type, index) => {
        // Function to handle changes in input fields
        const updatedDate = [...data];
        updatedDate[index][type] = value;
        setData(updatedDate);
    }

    const handleSave = async (rowData) => { 
        // Function to handle saving data

        console.log(rowData);
        setEditedRowIndex(-1);// Reset the edited row index
        if (rowData.id != '') {
            // If the row has an ID, it already exists in the database, so update it

            await Api.put(`escalation-matrix/${rowData.id}`, rowData).then((res) => {
                console.log(res)// Log the response after successful update
            }).catch((err) => {
                console.log(err);// Log any errors that occur during the update process
            })
        }
        else {
            // If the row does not have an ID, it is a new entry, so create it

            await Api.post("escalation-matrix", rowData).then((res) => {
                console.log(res)// Log the response after successful creation
            }).catch((err) => {
                console.log(err); // Log any errors that occur during the creation process
            })
        }
    }

    const handleDelete = async (rowDate, index) => {
        if(userRole=="Auditor" || userRole=="Client"){
            alert("You don't have permission");
            return
        }
        // Function to handle deleting a row

        const getConfimation = window.confirm("Do you really want to delete it");
        console.log(getConfimation);
        if (getConfimation == true) {
            // If the user confirms deletion

            await Api.delete(`escalation-matrix/${rowDate.id}`,).then((res) => {
                // Send delete request to the API endpoint

                const newData = [...data];// Create a copy of the data array
                newData.splice(index, 1);// Remove the deleted row from the copied data array
                setData(newData);// Update the state variable with the modified data
            }).catch((err) => {
                console.log(err);// Log any errors that occur during the deletion process
            })
        }
        setEditedRowIndex(-1);// Reset the edited row index
    }

    const handleAddRow = () => {
        if(userRole=="Auditor"){
            alert("You don't have permission");
            return
        }
        // Function to handle adding a new row
        setData([...data, {
            id: "", escalationLevel: "", role: "", name: "", type: "", project: {
                id: id
            }
        }]);// Append a new row with default values to the data array
    }

    const handleEdit = (index) => {

        if(userRole=="Auditor"){
            alert("You don't have permission");
            return
        }
        // Function to handle editing a row

        setEditedRowIndex(index);// Set the index of the row being edited
    }

    return (
        <div>
            <DynamicTable tableNames={tableNames}
                data={data}
                handleChange={handleChange}
                handleDelete={handleDelete}
                handleAddRow={handleAddRow}
                editedRowIndex={editedRowIndex}
                handleEdit={handleEdit}
                handleSave={handleSave}
                projectId={id}
            />
        </div>
    )
}

const DynamicTable = ({ tableNames, data, handleAddRow, handleChange, handleDelete, editedRowIndex, handleEdit, handleSave ,projectId }) => {
    useEffect(() => {
    }, [EscalationMatrix])
    return (
        <>
            <Button onClick={handleAddRow} className="w-20" style={{ marginBottom: "8px" }}>Add Row </Button>
            <Table columns={tableNames}>
                <TableHeader>
                    {
                        tableNames.map(element => {
                         
                            return <TableHeaderCell title={element} />
                        })
                    }
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => 
                       row?.project?.id == projectId ?
                    (
                        <TableRow key={index}>
                            <TableCell>
                                <input
                                    onChange={(e) => handleChange(e.target.value, "escalationLevel", index)}
                                    type="text" style={{ "border": "none" }} value={row.escalationLevel}
                                    readOnly={editedRowIndex != index} />
                            </TableCell>
                            <TableCell>
                                <input
                                    onChange={(e) => handleChange(e.target.value, "role", index)}
                                    type="text" style={{ "border": "none" }} value={row.role}
                                    readOnly={editedRowIndex != index} />
                            </TableCell>
                            <TableCell>
                                <input
                                    onChange={(e) => handleChange(e.target.value, "name", index)}
                                    type="text" style={{ "border": "none" }} value={row.name}
                                    readOnly={editedRowIndex != index}
                                />
                            </TableCell>
                            <TableCell>
                
                                <select
                                    onChange={(e) => handleChange(e.target.value, "type", index)}
                                    value={row.type}
                                    readOnly={row.id !== ''}
                                    className="border-none w-full"
                                >
                                    <option value="finacial">Finacial</option>
                                    <option value="operation">Operational</option>
                                    <option value="technical">Technical</option>
                                </select>
                            </TableCell>
                            <TableCell style={{ padding: "2px" }}>
                                {editedRowIndex != index ? (
                                    <>
                                        <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(row, index)} >Delete</button>
                                        {/* <button className="" onClick={() => handleSave(row)} >Save</button>  */}
                                    </>
                                ) : (
                                    <button className="" onClick={() => handleSave(row)} >Save</button>
                                )}
                            </TableCell>
                        </TableRow>
                    ):null)}
                </TableBody>
            </Table>
        </>
    );
};
