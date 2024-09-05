import { useEffect, useState } from "react";


import Profile from "./Profile";

function Pfetch() {
  const [user, setuser] = useState([]);

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
          







      } catch (error) {
        console.error("Error fetching user data:", error);
        
      } finally {
        
      }
    };
  
    fetchData();
  }, []);



 

  return (
    <>
      <Profile user={user} userdetails={userdetails} />
    </>
  );
}

export default Pfetch;
