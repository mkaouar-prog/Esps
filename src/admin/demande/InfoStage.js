import { useEffect, useState } from "react";
import { SocialIcon } from 'react-social-icons'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";

const InfoStage = ({ stage , onConfirm , onCancel}) => {

  const [userp, setuserp] = useState([]);

  

useEffect(() => {
  const fetchDatax = async () => {
  try {
    const infoResponsex =  await fetch(`http://localhost:5135/api/stages`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const infoContentx =  await infoResponsex.json();
   
    
    if(infoContentx){
      setuserp(infoContentx.find((details) => details.ref === stage.referance))
    }
  } catch (infoError) {
    console.error("Error fetching user info:", infoError);
    
  }
};
fetchDatax();
}, []);





    
  return (
    <Dialog open={true}
    PaperProps={{ style: { width: '35%', maxWidth: 'none' } }}
    >
      <DialogTitle>
      <Typography variant="h5">
       
           Stage Réferance : <strong>{userp.ref}</strong>
        </Typography>
        
      </DialogTitle>

      

      <DialogContent>
      <Typography variant="h6">
        <p></p>
        <img
  src={userp.imgUrl}
  style={{
    width: '100px',
    height: '100px',
    borderRadius: '50%', 
    objectFit: 'cover', 
  }}
/>
           <p>Societé : <strong>{userp.societe}</strong></p>
           <p>Titre de Sujet : <strong>{userp.titre}</strong></p>
           <p>Description : <strong>{userp.description}</strong></p>
        </Typography>






        <Typography variant="subtitle2">
          Tous les informations de Stage <strong>{userp.ref}</strong>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onCancel}>
          OK
        </Button>
        
      </DialogActions>
    </Dialog>
  );
};

export default InfoStage;
