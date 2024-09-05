import { useEffect, useState } from "react";

import Dashboard from "./Dashboard";

function Dfetch() {
  const [user, setuser] = useState([]);
  const [stage, setstage] = useState([]);
  const [userdetails, setuserdetails] = useState([]);



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
              const infoResponse = await fetch(`http://localhost:5135/api/user/${content.id}/info`, {
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
        
      }
    };
  
    fetchData();
  }, []);



 

  return (
    <>
      <Dashboard user={user} userdetails={userdetails} stage={stage}/>
    </>
  );
}

export default Dfetch;
