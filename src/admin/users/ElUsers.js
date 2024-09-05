import React, { useEffect, useState } from "react";
import ConfirmNotification from "./ConfirmNotification";
import { MdVerifiedUser } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import ConfirmDelete from "./ConfirmDelete";

function ElUsers({ users, usersdetails }) {
  useEffect(() => {
    setUpdatedUsers([...users.reverse()]);
  }, [users]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirmationDeleteOpen, setIsConfirmationDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [updatedUsers, setUpdatedUsers] = useState([...users.reverse()]);
  if (!Array.isArray(users)) {
    console.error("Invalid users prop:", users);
    return null;
  }

  const handleInfosClick = (userId) => {
    setSelectedUserId(userId);
    setIsConfirmationOpen(true);
  };
  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setIsConfirmationDeleteOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmationOpen(false);
  };
  const handleDeleteConfirm = () => {
    setIsConfirmationDeleteOpen(false);
    setUpdatedUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUserId));
    
  };
  const handleCancel = () => {
   
    setIsConfirmationOpen(false);
  };
  const handleDeleteCancel = () => {
   
    setIsConfirmationDeleteOpen(false);
  };
 
  return (
    <div>
      <h2>List des Candidateurs</h2>
      <table className="table table-striped" style={{ textAlign: 'left' }}>
               <thead>
              <tr>
                <th>Numéro</th>
                <th>Nom & Prénom</th>
                <th>Email</th>
                <th>Complété</th>
                <th></th>
              </tr>
            </thead>
        {updatedUsers.map((user) => {
          const userDetails = usersdetails.find((details) => details.userId === user.id);

          return (
            
            <tbody>
            <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{userDetails? <MdVerifiedUser style={{color: 'green' , width: '25px', height: '25px '}}/> : <MdCancel style={{color: 'red' , width: '25px', height: '25px '}}/>}</td>
            <td> {userDetails? <button onClick={() => handleInfosClick(user.id)} className="btn btn-primary">Infos</button> : ""}</td>
            <td> {user? <button onClick={() => handleDeleteClick(user.id)} className="btn btn-danger">Supprimer</button> : ""}</td>

            </tr>
          </tbody>
         
          );
          
        })}
         </table>
    

      {isConfirmationOpen && (
        <ConfirmNotification
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          userDetails={usersdetails.find((details) => details.userId === selectedUserId)}
          user={users.find((x) => x.id === selectedUserId)}
        />
      )}

  {isConfirmationDeleteOpen && (
        <ConfirmDelete
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          userDetails={usersdetails.find((details) => details.userId === selectedUserId)}
          user={users.find((x) => x.id === selectedUserId)}
        />
      )}
    </div>
  );
}

export default ElUsers;
