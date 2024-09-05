import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [userName, setUserName] = useState("Admin");

  const handleLogout = () => {
    localStorage.removeItem("adminPassword");
  };

  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark "style={{ backgroundColor: '#37517e' }}>
      <div className="container-fluid" style={{ width: '1500px' }}>
        <div className="navbar-brand d-flex align-items-center">
          <FaUserCircle size={40} color="#fff" />
          <h4 className="d-inline ml-2 text-white">{userName}</h4>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/admin/" className="nav-link text-white">
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link text-white">
                Tous Les Candidateurs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/add" className="nav-link text-white">
                Ajouter Stage
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/list" className="nav-link text-white">
                List des Stages
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/demandes" className="nav-link text-white">
                Demandes
              </Link>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
