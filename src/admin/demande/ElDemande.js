import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import InfoUser from './InfoUser';
import InfoStage from "./InfoStage";
import Decision from "./Decision";
function ElDemande({ demandes }) {
   
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isStageOpen, setIsStageOpen] = useState(false);
    const [isDemandeOpen, setIsDemandeOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedStage, setSelectedStage] = useState(null);
    const [selectedDemande, setSelectedDemande] = useState(null);

    const handleInfosClick = (userId) => {
        setSelectedUserId(userId);
        setIsConfirmationOpen(true);
      };

      const handleDemandeClick = (demande) => {
        setSelectedDemande(demande);
        setIsDemandeOpen(true);
      };

      const handleStageClick = (stage) => {
        setSelectedStage(stage);
        setIsStageOpen(true);
      };

      const handleConfirmDemande = () => {
        setIsDemandeOpen(false);

      };
      const handleCancelDemande = () => {
   
        setIsDemandeOpen(false);
        setSelectedDemande(null);
      };



      const handleConfirmStage = () => {
        setIsStageOpen(false);
      };
      const handleCancelStage = () => {
   
        setIsStageOpen(false);
      };


    const handleConfirm = () => {
        setIsConfirmationOpen(false);
      };
      const handleCancel = () => {
   
        setIsConfirmationOpen(false);
      };
        


  return (
    <div className="container" style={{ textAlign: 'left' }}>
      <div className="row">
        <div className="container">
          <table className="table table-striped" style={{ textAlign: 'left' }}>
            <thead>
              <tr>
                <th>#</th>
                <center>
                <th>Réferance de Stage</th>
                </center>
                <th>Numéro du Candidat</th>
                <th>Status</th>
               
                
              </tr>
            </thead>
            <tbody>
            {[...demandes].reverse().map((demande) => (
                <tr key={demande.id}>
                    <td>{demande.id}</td>
                    <td><center>{demande.referance}</center></td>
                    <td><span>{demande.userId}</span></td>
                 
                 
                  
                          
            



                  

                  <td>{demande.status === 0 ? (
          <button type="button" className="btn btn-warning" disabled>
            En Cours de Traitement
          </button>
        ) : demande.status === 1 ? (
          <button type="button" className="btn btn-success">
            Retenu(e)
          </button>
        ) : demande.status === 2 ? (
          <button type="button" className="btn btn-danger">
            Refusé(e)
          </button>
        ) : (
          ''
        )}
                  </td>





                   <td> {demande? <button onClick={() => handleInfosClick(demande.userId)} className="btn btn-primary">Infos Candidat</button> : ""}</td>
                   <td> {demande? <button onClick={() => handleStageClick(demande.referance)} className="btn btn-success">Infos Stage</button> : ""}</td>
                   <td> {demande? <button onClick={() => handleDemandeClick(demande.id)} className="btn btn-dark">Decision</button> : ""}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
          {isConfirmationOpen && (
        <InfoUser
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          user={demandes.find((details) => details.userId === selectedUserId)}
          
        />
      )}
       {isStageOpen && (
        <InfoStage
          onConfirm={handleConfirmStage}
          onCancel={handleCancelStage}
          stage={demandes.find((details) => details.referance === selectedStage)}
          
        />
      )}
       {isDemandeOpen && (
        <Decision
          onConfirm={handleConfirmDemande}
          onCancel={handleCancelDemande}
          demande={demandes.find((details) => details.id === selectedDemande)}
          
        />
      )}



        </div>
      </div>
    </div>
  );
}

export default ElDemande;
