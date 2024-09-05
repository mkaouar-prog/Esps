import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import InfoStage from "../../admin/demande/InfoStage";
const Demande = ({ user, demandes, stage }) => {
    const [selectedStage, setSelectedStage] = useState(null);
    const [isStageOpen, setIsStageOpen] = useState(false);
    const navigate = useNavigate();
    const handleStageClick = (stage) => {
        setSelectedStage(stage);
        setIsStageOpen(true);
      };
      const handleConfirmStage = () => {
        setIsStageOpen(false);
      };
      const handleCancelStage = () => {
   
        setIsStageOpen(false);
      };
    let filteredOrders = [];

  
    if (user && user.id) {
        filteredOrders =  [...demandes].reverse().filter(demande => demande.userId === user.id);
      }
    
  return (
    <div className="container" style={{ textAlign: 'left' }}>
        <h2>Mes Demandes</h2>
      <div className="row">
        <div className="container">
          <table className="table table-bordered table-hover" style={{ textAlign: 'left' }}>
         
            <thead>
          
              <tr>
              
              <th><center>Demande Numéro</center></th>  
                <th style={{color:'blue'}}><center>Réferance du Stage</center></th>
                <th>Détails du Stage</th>
                <th>Status</th>
              
              
              </tr>
              
            </thead>
           
            <tbody>
           
            {filteredOrders.map((demande) => (
                <tr key={demande.id}>
                    <td><center>{demande.id}</center></td>
                 
                  <center><strong><td style={{color: 'blue'}}>{demande.referance}</td></strong></center>

                  <td> {demande? <button onClick={() => handleStageClick(demande.referance)} className="btn btn-secondary">Détails du Stage</button> : ""}</td>
                 
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
                  
                </tr>
              ))}
            </tbody>
          </table>
          {isStageOpen && (
        <InfoStage
          onConfirm={handleConfirmStage}
          onCancel={handleCancelStage}
          stage={demandes.find((details) => details.referance === selectedStage)}
          
        />
      )}
        </div>
      </div>
    </div>
  );
}

export default Demande;
