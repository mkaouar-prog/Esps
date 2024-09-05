
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { SocialIcon } from 'react-social-icons'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
const Postule = ({ onConfirm, onCancel, stage , user }) => {
    const [userId, setUserId] = useState(user.userId);
    const [referance, setReferance] = useState(stage.ref);
    const [status, setStatus] = useState(0);
    const navigate = useNavigate();

    const handleConfirm = async (e) => {
        e.preventDefault();
       
        
        const response =await fetch('http://localhost:5135/api/demande/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                userId,
                referance,
                status
            })
            
            
        });

        const content = await response.json();
        if (content.message == 'x')
        {
          toast.success("Demande Confirmée");
          navigate("/demandes");
        }
        else
        {
            toast.error("Déja Postulée");
        }

        
      };
  

  return (
    <Dialog open={true}
    PaperProps={{ style: { width: '35%', maxWidth: 'none' } }}
    >
      <DialogTitle>
      <Typography variant="h5">
       
           Stage Réferance : <strong>#{stage.ref}</strong>
        </Typography>
        
      </DialogTitle>

      

      <DialogContent>
      <Typography variant="h6">
        <p></p>
        <center>
        <img
  src={stage.imgUrl}
  style={{
    width: '100px',
    height: '100px',
    
    objectFit: 'cover', 
  }}
/>
</center>
           <p>Société : <strong>{stage.societe}</strong></p>
        </Typography>



      
<Typography variant="h6">
Titre de Sujet : <strong>{stage.titre}</strong>
</Typography>
<Typography variant="h6">
  Description : 
  <p>{stage.description}</p>
</Typography>






        <Typography variant="subtitle2">
          Vous voulez Postulez à ce Sujet <strong>{stage.titre}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onCancel} color="error">
          Annuler
        </Button>
        <Button variant="contained"  onClick={handleConfirm}>
          Confirmer
        </Button>
        
      </DialogActions>
    </Dialog>
  );
};

export default Postule;
