import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loadgif from "../images/mx.png";
const date = new Date();
const year = date.getFullYear();

const Loader = () => {
  const [id, setId] = useState(0);
  const [ok, setOk] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role,setRole]=useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5135/api/user", {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
  
        const content = await response.json();
        if (content.role==1)
        setRole(1)
        if (content && content.id ) {
          setId(content.id);
  
          try {
            const infoResponse = await fetch(`http://localhost:5135/api/user/${content.id}/info`, {
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
  
            const infoContent = await infoResponse.json();
            console.log("infoContent:", infoContent);
            console.log(infoContent.UserId)
            // Use strict equality for comparison
            if (infoContent.userId === content.id) {
              setOk(true);
            } else {
              setOk(false);
            }
          } catch (infoError) {
            console.error("Error fetching user info:", infoError);
            setOk(false);
          }
        } else {
          setId(0);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setId(0);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    console.log("id:", id);
    console.log("ok:", ok);
  }, [id, ok]);

  useEffect(() => {
    if (!isLoading) {
      const redirectTimeout = setTimeout(() => {
        if (role==1)
        navigate('/admin/')
    else{
        if (ok && id) {
          console.log("Redirecting to '/'...");
          navigate('/accueil');
        } else {
          console.log("Redirecting to '/preinscription'...");
          navigate('/preinscription');
        }
    }
      }, 2000); // Set the timeout duration in milliseconds (e.g., 2000 for 2 seconds)

      return () => clearTimeout(redirectTimeout);
    }
  }, [isLoading, ok, id, navigate]);

  return (
    <div className="container mt-3">
      {isLoading ? (
        <p></p>
      ) : (
        <center>
        <section className="container mt-3">
        <img src={loadgif}  style={{ width: '510px', height: '510px' }}/>
        </section>
        </center>
      )}
    </div>
  );
};

export default Loader;
