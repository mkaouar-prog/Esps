import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Postule from "./Postule";

const Dashboard = ({ user, userdetails, stage }) => {
  console.log(userdetails);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const handlePostuleClick = (userId) => {
    setSelectedUserId(userId);
    
    setIsConfirmationOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmationOpen(false);
  };
 
  const handleCancel = () => {
   
    setIsConfirmationOpen(false);
  };


  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Sidebar - Profile Info */}
        <div className="col-lg-2 position-fixed">
          <div className="card card-profile" style={{ backgroundColor: 'white', marginLeft: '10px', marginTop: '30px' }}>
            <div className="card-body">
              <div className="profile-image-wrapper">
                <div className="profile-image">
                  <center>
                  <div className="avatar">
                    {userdetails.photo?( <img
                      alt="Profile Picture"
                      onError={(e) => {
                        e.target.src = 'https://img.freepik.com/vecteurs-libre/illustration-homme-affaires_53876-5856.jpg';
                      }}
                      style={{ cursor: 'default', width: '150px', height: '150px' }}
                      src={userdetails.photo}
                      className="img-fluid rounded-circle"
                    />):( <img
                      alt="Profile Picture"
                      onError={(e) => {
                        e.target.src = 'https://img.freepik.com/vecteurs-libre/illustration-homme-affaires_53876-5856.jpg';
                      }}
                      style={{ cursor: 'default', width: '150px', height: '150px' }}
                      src='https://img.freepik.com/vecteurs-libre/illustration-homme-affaires_53876-5856.jpg'
                      className="img-fluid rounded-circle"
                    />)}
                   
                  </div>
                  </center>
                </div>
              </div>
              <center>
              <h3 className="text-capitalize">{user.name}</h3>
              <h6 className="text-muted"> {user.email}</h6>
              <div style={{ color: 'blue' }}>
                Étudiant à la recherche d'un stage
              </div>
              </center>
              <hr className="mb-2" />
              <div className="d-flex justify-content-between align-items-center">
        <ul className="list-group" style={{marginLeft:'30px'}}>
      <li className="list-group-item d-flex border-0 text-secondary">
        <p className="float-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user mr-1"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </p>
       <center><Link style={{color:'#6c757d',textDecoration: 'none'}} to="/profile"><span>Mon profile</span> </Link></center> 
      </li>
      <li className="list-group-item d-flex border-0 text-secondary" style={{marginTop:'10px'}}>
        <p className="float-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-file-text mr-1"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </p>
        <Link style={{color:'#6c757d',textDecoration: 'none'}} to="/demandes"><span>Mes Demandes</span> </Link>
      </li>
    </ul>
        </div>
            </div>
          </div>
        </div>

        {/* Right Content - Search and Stage */}
        <div className="col-lg-10 offset-lg-2">
          <div style={{ marginLeft: '100px', marginRight: '100px', marginTop: '20px' }}>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                placeholder="Rechercher Sujet , Société , Réferance"
                aria-label="Search"
                type="text"
              />
            </form>
            <p></p>
            <div className="column">
  {stage.map((singleStage) => {
     const stageref = stage.find((details) => details.ref === singleStage.ref);

    return (
      <div key={singleStage.id} className="mb-4">
        <div className="card h-100 text-black" style={{ borderColor: '#224092' }}>
          <img
            src={singleStage.imgUrl}
            className="card-img-top"
            alt={singleStage.designation}
            style={{ objectFit: 'contain', height: '300px', width: '100%' }}
          />
          <div className="card-body bg-white" style={{ objectFit: 'cover', height: '80px', width: '100%' }}>
            <h5 className="card-title">Société: {singleStage.societe}</h5>
            <p className="card-title">Sujet: {singleStage.titre}</p>
            <div
              className="position-absolute top-0 start-0 text-white rounded-circle p-2"
              style={{ zIndex: 1 , backgroundColor:'#224092'}}
            >
              #{singleStage.ref}
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-white" style={{ textAlign: 'center' }}>
            {singleStage.titre}
            </li>
            <li className="list-group-item bg-white" style={{ textAlign: 'center' }}>{singleStage.description}</li>
          </ul>
          <div className="card-body bg-white" style={{ objectFit: 'cover', height: '60px', width: '100%' }}>
            <center>
              <a href="#" className="btn btn-secondary" style={{backgroundColor:'#224092'}} onClick={() => handlePostuleClick(singleStage.ref)}>Postulez Maintenant</a>
            </center>
          </div>
        </div>
      </div>
    );
  })}
</div>
{isConfirmationOpen && (
        <Postule
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          stage={stage.find((singleStage) => singleStage.ref === selectedUserId)}
          user={userdetails}
        />
      )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
