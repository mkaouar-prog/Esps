import React, { useEffect, useState } from "react";
import { useTypingEffect } from "../Hooks/typing-effect";
import loginImg from "../images/1.png";
import logoImg from "../images/logo.png";

const Home = () => {
  const [name,setName] = useState('');
  const x =
    "On s’occupe pour un stagiaire de lui trouver des missions adaptées aussi bien à ses compétences qu’aux besoins des clients.<br /> <strong>Votre réussite est notre mission</strong>";

  const text = useTypingEffect(x, 20);
  useEffect(()=>{
   (
    async () => {
      const response = await fetch('http://localhost:5135/api/user', {
     
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      
      });
      const content = await response.json();
      if (content)
      setName(content.name)
      else
      setName("Not logged")

    }
   )();
    
  });
  return (
    <section className="container mt-3">
  <div className="row align-items-center">
    <div className="col-md-6">
      <img src={loginImg} alt="Login" className="img-fluid rounded" style={{ maxWidth: '80%', height: 'auto' }} />
    </div>
    <div className="col-md-6">
      <div className="text-center">
        <h1>Bienvenue ,  {name}</h1>
        <h1 className="display-4 mb-4">COLLABORATION DE FORMATION</h1>
        <p className="lead mb-4" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  </div>
</section>

  );
};

export default Home;
