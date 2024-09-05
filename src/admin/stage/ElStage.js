import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ConfirmDelete from "./ConfirmDelete";

const ElStage = ({ stage }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isConfirmationDeleteOpen, setIsConfirmationDeleteOpen] = useState(false);
  useEffect(() => {
    setUpdatedUsers([...stage.reverse()]);
  }, [stage]);
  const [updatedUsers, setUpdatedUsers] = useState([...stage.reverse()]);

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setIsConfirmationDeleteOpen(true);
  };
  const handleDeleteConfirm = () => {
    setIsConfirmationDeleteOpen(false);
    setUpdatedUsers((stages) => stages.filter((stage) => stage.id !== selectedUserId));
    
  };
  const handleDeleteCancel = () => {
   
    setIsConfirmationDeleteOpen(false);
  };
  return (
    <div className="container" style={{ textAlign: 'left' }}>
      <div className="row">
        <div className="container">
          <table className="table table-striped" style={{ textAlign: 'left' }}>
            <thead>
              <tr>
                <th>#Réferance</th>
                <th>Image</th>
                <th>Société</th>
                <th>Titre</th>
                <th>Description</th>
                
                
                
              </tr>
            </thead>
            <tbody>
              {updatedUsers.map((stage) => (
                <tr key={stage.id}>
                    <td>{stage.ref}</td>
                  <td>
                    <img
                      src={stage.imgUrl}
                      width="150px"
                      height="150px"
                      alt={stage.societe}
                    />
                  </td>
                  
                  <td>{stage.societe}</td>
                  <td>{stage.titre}</td>
                  <td>{stage.description}</td>
                  
                
                  <td> {stage? <button onClick={() => handleDeleteClick(stage.id)} className="btn btn-danger">Supprimer</button> : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isConfirmationDeleteOpen && (
        <ConfirmDelete
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          stage={stage.find((details) => details.id === selectedUserId)}
         
        />
      )}
        </div>
      </div>
    </div>
  );
}

export default ElStage;
