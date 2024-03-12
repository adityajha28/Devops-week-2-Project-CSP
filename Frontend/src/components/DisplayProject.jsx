import React, { useState, useEffect } from "react";
import { Box, Flex, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell, Label, Button } from "monday-ui-react-core";
import Api from "./Api";
import { Link } from "react-router-dom";
export default function DisplayProject() {
    const [data, setData] = useState([]);

    const tableNames = ['Name', 'Description'];


    const fetchData = async () => {
       await Api.get("/project").then((res) => {
            console.log(res.data);
            setData(res.data);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <DynamicTable tableNames={tableNames}
                data={data}
            />
        </div>
    )
}

const DynamicTable = ({ tableNames, data }) => {
    return (
        <>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
