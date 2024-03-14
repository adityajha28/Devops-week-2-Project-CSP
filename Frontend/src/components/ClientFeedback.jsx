import React, { useState, useEffect } from 'react';
import { Button, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from 'monday-ui-react-core';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Api from './Api';

const ClientFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editedRowIndex, setEditedRowIndex] = useState();
  const { id } = useParams();
  const userRole=localStorage.getItem("userRole");
  const tableHeaders = ['Feedback Type', 'Date Received', 'Detailed Feedback', 'Action Taken', 'Closure Date','Actions'];

  useEffect(() => {
    console.log(userRole);
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await Api.get('/clientfeedbacks');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching client feedbacks:', error);
    }
  };

  const handleChange = (index, type, value) => {

    const updatedFeedbacks = [...feedbacks];
    updatedFeedbacks[index][type] = value;
    setFeedbacks(updatedFeedbacks);
  };

  const handleSave = async (rowData) => {
    try {
        setEditedRowIndex(-1);
      if (rowData.id) {
        await Api.put(`/clientfeedbacks/${rowData.id}`, rowData);
      } else {
        await Api.post('/clientfeedbacks', rowData);
      }
      
      fetchFeedbacks();
    } catch (error) {
      console.error('Error saving client feedback:', error);
    }
  };

  const handleDelete = async (rowData, index) => {
    if(userRole=="Auditor" || userRole=="Admin" || userRole=="ProjectManager"){
        alert("You don't have permission");
        return
    }
    
    try {
      const confirmation = window.confirm('Do you really want to delete it?');
      if (confirmation) {
        await Api.delete(`/clientfeedbacks/${rowData.id}`);
        const updatedFeedbacks = [...feedbacks];
        updatedFeedbacks.splice(index, 1);
        setFeedbacks(updatedFeedbacks);
      }
    } catch (error) {
      console.error('Error deleting client feedback:', error);
    }
    setEditedRowIndex(-1);
  };

  const handleEdit = (index) => {
    if(userRole=="Auditor" || userRole=="Admin" || userRole=="ProjectManager"){
        alert("You don't have permission");
        return
    }
    setEditedRowIndex(index);
  };

  const handleAddRow = () => {
    setFeedbacks([...feedbacks, {
      id: null,
      feedbackType: '',
      dateReceived: '',
      detailedFeedback: '',
      actionTaken: '',
      closureDate: '',
      project: {
        id: id
      }
    }]);
  };

  return (
    <div>
      <Button onClick={handleAddRow} className="w-20" style={{ marginBottom: '8px' }}>Add Feedback</Button>
      <Table columns={[
        { id: 'feedbackType', title: 'Feedback Type' },
        { id: 'dateReceived', title: 'Date Received' },
        { id: 'detailedFeedback', title: 'Detailed Feedback' },
        { id: 'actionTaken', title: 'Action Taken' },
        { id: 'closureDate', title: 'Closure Date' },
        { id: 'Action', title: 'Action' },
      ]}>
        <TableHeader>
          {tableHeaders.map(header => (
            <TableHeaderCell key={header} title={header} />
          ))}
        </TableHeader>
        <TableBody>
          {feedbacks.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <input
                  type="text"
                  value={row.feedbackType}
                  onChange={(e) => handleChange(index, 'feedbackType', e.target.value)}
                  readOnly={editedRowIndex !== index}
                  className="border-none w-full"
                />
              </TableCell>
              <TableCell>
                <input
                  type="date"
                  value={row.dateReceived}
                  onChange={(e) => handleChange(index, 'dateReceived', e.target.value)}
                  readOnly={editedRowIndex !== index}
                  className="border-none w-full"
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  value={row.detailedFeedback}
                  onChange={(e) => handleChange(index, 'detailedFeedback', e.target.value)}
                  readOnly={editedRowIndex !== index}
                  className="border-none w-full"
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  value={row.actionTaken}
                  onChange={(e) => handleChange(index, 'actionTaken', e.target.value)}
                  readOnly={editedRowIndex !== index}
                  className="border-none w-full"
                />
              </TableCell>
              <TableCell>
                <input
                  type="date"
                  value={row.closureDate}
                  onChange={(e) => handleChange(index, 'closureDate', e.target.value)}
                  readOnly={editedRowIndex !== index}
                  className="border-none w-full"
                />
              </TableCell>
              <TableCell>
                {editedRowIndex !== index ? (
                  <>
                    <Button onClick={() => handleEdit(index)}>Edit</Button>
                    <Button onClick={() => handleDelete(row, index)}>Delete</Button>
                  </>
                ) : (
                  <Button onClick={() => handleSave(row)}>Save</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientFeedback;

