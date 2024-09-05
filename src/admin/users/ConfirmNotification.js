import React from "react";
import { SocialIcon } from 'react-social-icons'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";

const ConfirmNotification = ({ onConfirm, onCancel, userDetails , user }) => {
  return (
    <Dialog open={true}
    PaperProps={{ style: { width: '35%', maxWidth: 'none' } }}
    >
      <DialogTitle>
      <Typography variant="h5">
       
           Infos Candidat  Numéro : <strong>{userDetails.userId}</strong>
        </Typography>
        
      </DialogTitle>

      

      <DialogContent>
      <Typography variant="h6">
        <p></p>
        <img
  src={userDetails.photo}
  style={{
    width: '100px',
    height: '100px',
    borderRadius: '50%', 
    objectFit: 'cover', 
  }}
/>
           <p>Nom & Prénom : <strong>{user.name}</strong></p>
        </Typography>



      <Typography variant="h6">
  Ville : {userDetails.ville === 0 ? <strong>Sfax</strong> : userDetails.ville === 1 ? <strong>Tunis</strong> : ""}
</Typography>

<Typography variant="h6">
 Status : {userDetails.status === 0 ? <strong>Employé(e)</strong> : userDetails.status === 1 ? <strong>Étudiant(e)</strong> : userDetails.status === 2 ? <strong>Indépendant(e)</strong> : ""}
</Typography>
<Typography variant="h6">
  Telephone : <strong>{userDetails.telephone}</strong>
</Typography>
<Typography variant="h6">
  Disponibilité : <strong>{userDetails.dispo.split("T")[0]}</strong>
</Typography>

<Typography variant="h6">
 Domaine : {userDetails.categorie === 0 ? <strong>Informatique</strong> : userDetails.categorie === 1 ? <strong>Mecanique</strong> : userDetails.categorie === 2 ? <strong>Economie</strong> : ""}
</Typography>


<Typography variant="h6">
<SocialIcon network="linkedin" style={{ width: '35px' , height: '35px' }} /> Linkedin : <a href={userDetails.linkedinUrl} target="_blank">{userDetails.linkedinUrl}</a>
</Typography>
<p></p>
<Typography variant="h6">
 Cv : <button className="btn btn-primary"><a href={userDetails.urlCv} target="_blank" style={{color: 'white'}}><strong>Voir</strong></a></button>
</Typography>
<p></p>
<Typography variant="h6">
 Lettre : <button className="btn btn-primary"><a href={userDetails.urlLettre} target="_blank" style={{color: 'white'}}><strong>Voir</strong></a></button>
</Typography>




        <Typography variant="subtitle2">
          Tous les informations de Candidature
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

export default ConfirmNotification;
