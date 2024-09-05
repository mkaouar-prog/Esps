import { useEffect, useState } from "react";


import ElStage from "./ElStage";

function ListStage() {
  const [stage, setstage] = useState([]);

 



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5135/api/stages", {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
  
        const content = await response.json();
        setstage(content)


      } catch (error) {
        console.error("Error fetching stage data:", error);
        
      } finally {
        
      }
    };
  
    fetchData();
  }, []);



 

  return (
    <>
      <ElStage stage={stage} />
    </>
  );
}

export default ListStage;
