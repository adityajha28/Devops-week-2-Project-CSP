import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell, Label, Button, TabList, TabsContext, Tab, TabPanel, TabPanels, Flex, Box } from "monday-ui-react-core";
import Api from "../api/Api";
import { Link } from "react-router-dom";
export default function DisplayProject() {
    const [data, setData] = useState([]);
    const [editedRowIndex, setEditedRowIndex] = useState(-1);
    const [activeTab, setActiveTab] = useState(0);
    const tableNames = ['Name', 'Description', 'Status', 'Project Manager', 'Members', 'Action'];


    const fetchData = async () => {
        await Api.get("/project").then((res) => {
            console.log(res.data);

            setData(res.data);
        }).catch((e) => {
            setData([]);
        })
    }

    useEffect(() => {
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

            await Api.put(`/project/${rowData.id}`, rowData).then((res) => {
                console.log(res)// Log the response after successful update
            }).catch((err) => {
                console.log(err);// Log any errors that occur during the update process
            })
        }
        else {
            // If the row does not have an ID, it is a new entry, so create it

            await Api.post("/project", rowData).then((res) => {
                console.log(res)// Log the response after successful creation
            }).catch((err) => {
                console.log(err); // Log any errors that occur during the creation process
            })
        }
    }


    const handleDelete = async (rowDate, index) => {
        // Function to handle deleting a row

        const getConfimation = confirm("Do you really want to delete it");
        console.log(getConfimation);
        if (getConfimation == true) {
            // If the user confirms deletion

            await Api.delete(`/project/${rowDate.id}`,).then((res) => {
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
    useEffect(() => {
        console.log(activeTab)
    }, [activeTab])
    const handleEdit = (index) => {
        // Function to handle editing a row

        setEditedRowIndex(index);// Set the index of the row being edited
    }
    return (
        <div>

            <div class="flex gap-5 my-2" style={{ flexDirection: "row" }}>
                <div class="bg-white w-[15%] p-4 text-center rounded-lg shadow-lg">
                    <h1 className="text-3xl p-2">{data.length}</h1>
                    <p className="p-1">Total Project</p>
                </div>

                <div class="bg-white w-[15%] p-4 text-center rounded-lg shadow-lg">
                    <h1 className="text-3xl p-2">{data.filter((row) => row.status == "On Going").length}</h1>
                    <p className="p-1">On Going</p>
                </div>

                <div class="bg-white w-[15%] p-4 text-center rounded-lg shadow-lg">

                    <h1 className="text-3xl p-2">{data.filter((row) => row.status == "Hold").length}</h1>
                    <p className="p-1">Hold</p>
                </div>
                <div class="bg-white w-[15%] p-4 text-center rounded-lg shadow-lg">

                    <h1 className="text-3xl p-2">{data.filter((row) => row.status == "Closed").length}</h1>
                    <p className="p-1">Close</p>

                </div>
            </div>

            <TabList onTabChange={(tabId) => {
                setActiveTab(tabId)
            }}>
                <Tab>
                    All Projects
                </Tab>
                <Tab>
                    On Going
                </Tab>
                <Tab>
                    Hold
                </Tab>
                <Tab>
                    Closed
                </Tab>
            </TabList>

            <TabPanels activeTabId={activeTab}>
                <TabPanel><DynamicTable tableNames={tableNames}
                    data={data} editedRowIndex={editedRowIndex}
                    handleEdit={handleEdit} handleDelete={handleDelete}
                    handleSave={handleSave} handleChange={handleChange}
                /></TabPanel>
                <TabPanel><DynamicTable tableNames={tableNames}
                    data={data.filter((row) => row.status === "On Going")} editedRowIndex={editedRowIndex}
                    handleEdit={handleEdit} handleDelete={handleDelete}
                    handleSave={handleSave} handleChange={handleChange}

                /></TabPanel>
                <TabPanel><DynamicTable tableNames={tableNames}
                    data={data.filter((row) => row.status === "Hold")} editedRowIndex={editedRowIndex}
                    handleEdit={handleEdit} handleDelete={handleDelete}
                    handleSave={handleSave} handleChange={handleChange}

                /></TabPanel>
                <TabPanel><DynamicTable tableNames={tableNames}
                    data={data.filter((row) => row.status === "Closed")} editedRowIndex={editedRowIndex}
                    handleEdit={handleEdit} handleDelete={handleDelete}
                    handleSave={handleSave} handleChange={handleChange}

                /></TabPanel>
            </TabPanels>

        </div>
    )
}

const DynamicTable = ({ tableNames, data, editedRowIndex, handleEdit, handleDelete, handleSave, handleChange }) => {
    const statusOptions = [
        { value: 'On Going', label: 'Ongoing', color: 'positive' },
        { value: 'Hold', label: 'Hold', color: 'Dark' },
        { value: 'Closed', label: 'Closed', color: 'Negative' },
    ];


    return (
        <>
            <div className="m-2">
                <Table columns={tableNames}>
                    <TableHeader>
                        {
                            tableNames.map(element => {
                                return <TableHeaderCell title={element} />
                            })
                        }
                    </TableHeader>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Link to={`${row.id}`}>{row?.name}</Link>
                                </TableCell>
                                <TableCell>
                                    {row?.description}
                                </TableCell>
                                <TableCell>
                                    {editedRowIndex != index ? <>
                                        <Label key={statusOptions.value} text={row.status} color={statusOptions.filter((option) => option.value === row.status)[0]?.color} isAnimationDisabled />

                                    </> : <>

                                        <select
                                            onChange={(e) => handleChange(e.target.value, "status", index)}
                                            value={row.status}
                                            readOnly={editedRowIndex != index}
                                            className="border-none w-full"
                                        >
                                            {statusOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}

                                                </option>
                                            ))}
                                        </select>

                                        {statusOptions.map((option) =>
                                            row.status === option.value ? (
                                                <Label key={option.value} text={option.label} color={option.color} isAnimationDisabled />
                                            ) : null
                                        )}
                                    </>}

                                </TableCell>
                                <TableCell>
                                    <input
                                        onChange={(e) => handleChange(e.target.value, "projectManger", index)}
                                        type="text" style={{ "border": "none" }} value={row.projectManger}
                                        readOnly={editedRowIndex != index} />
                                </TableCell>
                                <TableCell>
                                    <input
                                        onChange={(e) => handleChange(e.target.value, "member", index)}
                                        value={row?.member}
                                        type="text" style={{ "border": "none" }}
                                        readOnly={editedRowIndex != index} />
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
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};
