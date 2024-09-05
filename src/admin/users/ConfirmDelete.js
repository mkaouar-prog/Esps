import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";

const ConfirmDelete = ({ onConfirm, onCancel, user }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5135/api/users/${user.id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('successfully deleted!');
      toast.success('Success');

      setIsDeleted(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleConfirm = () => {
    fetchData();
    onConfirm();
  };

  return (
    <Dialog open={!isDeleted}>
      <DialogTitle>
        <Typography variant="h4">Lorem ipsum dolor sit amet consectetuer</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          Are you sure you want to delete this user Number {user.id}?
        </Typography>
        <Typography variant="subtitle2">
          You can't undo this operation
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onCancel}>No</Button>
        <Button variant="contained" color="error" onClick={handleConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
