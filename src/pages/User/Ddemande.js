import { useEffect, useState } from "react";

import Dashboard from "./Dashboard";
import Demande from "./Demande";
import loadgif from "../../images/mx.png";
function Ddemande() {
  const [user, setuser] = useState([]);
  const [stage, setstage] = useState([]);
  const [userdetails, setuserdetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5135/api/user", {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
  
        const content = await response.json();
        setuser(content)

       
            
    
            try {
              const infoResponse = await fetch(`http://localhost:5135/api/demande/all`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
              });
    
              const infoContent = await infoResponse.json();
              console.log("infoContent:", infoContent);
              console.log(infoContent.UserId)
              
              if(infoContent){
                setuserdetails(infoContent)
              }
            } catch (infoError) {
              console.error("Error fetching user info:", infoError);
              
            }
          

            
              const responsestage = await fetch("http://localhost:5135/api/stages", {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
              });
        
              const contentstage = await responsestage.json();
              setstage(contentstage)
      
      
           





      } catch (error) {
        console.error("Error fetching user data:", error);
        
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);



 

  return (

    
    <>
    {isLoading ? (
        <center>
        <section className="container mt-3">
        <img src={loadgif}  style={{ width: '510px', height: '510px' }}/>
        </section>
        </center>
      ) : (
        
        <Demande user={user} demandes={userdetails} stage={stage}/>
      )}
      
    </>
  );
}

export default Ddemande;
