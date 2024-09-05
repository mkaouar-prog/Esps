
import React, { useState, useEffect } from "react";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1 >Bienvenue Admin</h1>
     <strong> <h4 style={{color:'gray'}}>Current time: {currentTime.toLocaleTimeString()}</h4></strong>
    </div>
  );
};

export default Home;
