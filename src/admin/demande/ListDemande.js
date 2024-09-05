
import { useEffect,useState } from "react";
import ElDemande from "./ElDemande";
import loadgif from "../../images/mx.png";

function ListDemande() {
    const[demandes,setdemandes]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5135/api/demande/all", {
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
      
            const content = await response.json();
            setdemandes(content)
    
    
          } catch (error) {
            console.error("Error fetching stage data:", error);
            
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchData();
      
      

    return ( 
        <>
         {isLoading ? (
        <center>
        <section className="container mt-3">
        <img src={loadgif}  style={{ width: '510px', height: '510px' }}/>
        </section>
        </center>
      ) : (
        <ElDemande demandes={demandes}/>
        )}
        </>
     );
}


export default ListDemande;