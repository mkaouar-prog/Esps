import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";

const ConfirmDelete = ({ onConfirm, onCancel, stage }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isConfirmationDeleteOpen, setIsConfirmationDeleteOpen] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5135/api/stage/${stage.id}/delete`, {
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
        <Typography variant="h4">Stage Réferance : {stage.ref}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          Vous voulez vraiment Supprimer ce Stage {stage.ref}?
        </Typography>
        <Typography variant="subtitle2">
        Vous ne pouvez pas annuler cette opération
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onCancel}>Non</Button>
        <Button variant="contained" color="error" onClick={handleConfirm}>
          Oui
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
