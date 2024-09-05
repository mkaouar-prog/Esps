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
import loadgif from "../../images/mx.png";
const InfoUser = ({ user , onConfirm , onCancel}) => {
  const [usersdetails, setUsersdetails] = useState([]);

  const [userp, setuserp] = useState([]);
  console.log(user.userId);
  useEffect(() => {
  const fetchData = async () => {
  try {
    const infoResponse =  await fetch(`http://localhost:5135/api/user/${user.userId}/info`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const infoContent =  await infoResponse.json();
    console.log("infoContent:", infoContent);
    console.log(infoContent.UserId)
    
    if(infoContent){
      setUsersdetails(infoContent)
      
    }
  } catch (infoError) {
    console.error("Error fetching user info:", infoError);
    
  }
  try {
    const infoResponsex =  await fetch(`http://localhost:5135/api/users`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const infoContentx =  await infoResponsex.json();
   
    
    if(infoContentx){
      setuserp(infoContentx.find((details) => details.id === user.userId))
      
    }
  } catch (infoError) {
    console.error("Error fetching user info:", infoError);
    
  }
};
fetchData();
}, []);







    
  return (
    <Dialog open={true}
    PaperProps={{ style: { width: '35%', maxWidth: 'none' } }}
    >
      
     
      <DialogTitle>
      <Typography variant="h5">
       
           Infos Candidat  Numéro : <strong>{usersdetails.userId}</strong>
        </Typography>
        
      </DialogTitle>

      

      <DialogContent>
      <Typography variant="h6">
        <p></p>
        <img
  src={usersdetails.photo}
  style={{
    width: '100px',
    height: '100px',
    borderRadius: '50%', 
    objectFit: 'cover', 
  }}
/>
           <p>Nom & Prénom : <strong>{userp.name}</strong></p>
        </Typography>



      <Typography variant="h6">
  Ville : {usersdetails.ville === 0 ? <strong>Sfax</strong> : usersdetails.ville === 1 ? <strong>Tunis</strong> : ""}
</Typography>

<Typography variant="h6">
 Status : {usersdetails.status === 0 ? <strong>Employé(e)</strong> : usersdetails.status === 1 ? <strong>Étudiant(e)</strong> : usersdetails.status === 2 ? <strong>Indépendant(e)</strong> : ""}
</Typography>
<Typography variant="h6">
  Telephone : <strong>{usersdetails.telephone}</strong>
</Typography>
<Typography variant="h6">
  Disponibilité : <strong>{usersdetails.dispo}</strong>
</Typography>

<Typography variant="h6">
 Domaine : {usersdetails.categorie === 0 ? <strong>Informatique</strong> : usersdetails.categorie === 1 ? <strong>Mecanique</strong> : usersdetails.categorie === 2 ? <strong>Economie</strong> : ""}
</Typography>


<Typography variant="h6">
<SocialIcon network="linkedin" style={{ width: '35px' , height: '35px' }} /> Linkedin : <a href={usersdetails.linkedinUrl} target="_blank">{usersdetails.linkedinUrl}</a>
</Typography>
<p></p>
<Typography variant="h6">
 Cv : <button className="btn btn-primary"><a href={usersdetails.urlCv} target="_blank" style={{color: 'white'}}><strong>Voir</strong></a></button>
</Typography>
<p></p>
<Typography variant="h6">
 Lettre : <button className="btn btn-primary"><a href={usersdetails.urlLettre} target="_blank" style={{color: 'white'}}><strong>Voir</strong></a></button>
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

export default InfoUser;
