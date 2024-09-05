import { useEffect, useState } from "react";
import ElUsers from "./ElUsers";

function ListUsers() {
  const [users, setUsers] = useState([]);

  const [usersdetails, setUsersdetails] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5135/api/users", {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
  
        const content = await response.json();
        setUsers(content)

       
            
    
            try {
              const infoResponse = await fetch(`http://localhost:5135/api/usersDetails`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
              });
    
              const infoContent = await infoResponse.json();
              console.log("infoContent:", infoContent);
              console.log(infoContent.UserId)
              
              if(infoContent){
                setUsersdetails(infoContent)
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
      <ElUsers users={users} usersdetails={usersdetails} />
    </>
  );
}

export default ListUsers;
