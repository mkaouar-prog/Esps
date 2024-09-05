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
import { useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import loadgif from "../../images/mx.png";
const Decision = ({ demande , onConfirm , onCancel}) => {
    const [status, setstatus] = useState(demande.status);
    const [isLoading, setIsLoading] = useState(true);
    const navigate=useNavigate();
    const handleRetenuClick = () => {
        
        setstatus(1);
      };
    
      const handleRefusClick = () => {
        
        setstatus(2);
      };
      const handleEnCoursClick = () => {
        
        setstatus(0);
      };

 

  


    const submit = async (e) => {
        e.preventDefault();
        
        const response =await fetch(`http://localhost:5135/api/demande/${demande.id}/update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                status





            })
            
            
        });
        const content = await response.json();

        if (content.message){
            toast.success('Confirmé');
            onConfirm();
           
        }

      
     
        
       
        
    };






    
  return (
 
    <Dialog open={true}
    PaperProps={{ style: { width: '35%', maxWidth: 'none' } }}
    >
      
         <DialogTitle>
   
   <Typography variant="h5">
    
        Demande Numéro : <strong>{demande.id}</strong>
     </Typography>
     
   </DialogTitle>

   

   <DialogContent>
   <Typography variant="h6">
     <p></p>
    
       <p>Candidat Numéro <strong>{demande.userId}</strong>  Pour Stage Réferance : <strong>{demande.referance}</strong></p>
     </Typography>

     
     {status === 0 ? (
         <>
             <button type="button" className="btn btn-warning" disabled>
               En Cours de Traitement
             </button>  |  
             <button type="button" className="btn btn-success"
               onClick={handleRetenuClick}>
             Retenu(e)
             </button>  |  
             <button type="button" className="btn btn-danger"
               onClick={handleRefusClick} >
               Refusé(e)
             </button>
         </>
           ) : status === 1 ? (
             <>
             <button type="button" className="btn btn-success" disabled>
               Retenu(e)
             </button>  |  
             <button type="button" className="btn btn-danger"
             onClick={handleRefusClick}
             >
             Refusé(e)
             </button>  |  
             <button type="button" className="btn btn-warning" 
             onClick={handleEnCoursClick}
             >
               En Cours de Traitement
             </button>
           </>
           ) : status === 2 ? (
             <>
             <button type="button" className="btn btn-danger" disabled>
               Refusé(e)
             </button>  |  
             <button type="button" className="btn btn-warning" 
               onClick={handleEnCoursClick}
             >
             En Cours de Traitement
           </button>  |  
            <button type="button" className="btn btn-success" 
             onClick={handleRetenuClick}
            >
            Retenu(e)
          </button>
          </>
           ) : (
             ''
           )}



     <Typography variant="subtitle2">
       Confimer Votre Choix ci-dessous :
     </Typography>
   </DialogContent>
   <DialogActions>
   <Button  variant="contained" color="error" onClick={onCancel}>
       Non
     </Button>
     <Button variant="contained" onClick={submit}>
       Valider
     </Button>

   
     
   </DialogActions>
        
        
    
     
    </Dialog>
  );
};

export default Decision;
