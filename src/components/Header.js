import React, { useState, useEffect } from "react";

import { Link , useNavigate } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import Cookies from 'js-cookie';
import logoImg from "../images/logo.png";
import { useLocation } from 'react-router-dom';


const Header = () => {
  const navigate=useNavigate();
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5135/api/user', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const content = await response.json();
        
        if (content) {
          setName(content.name);
          
        } else {
          setName('');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [location.key]); // Add location.key to trigger the effect on each navigation

  useEffect(() => {
    setIsLoggedIn(!!name);
  }, [name]);
  

  const logout = async () => {
    await fetch('http://localhost:5135/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    navigate("/")
    setIsLoggedIn(false);
  };



  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg"> 
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logoImg}
              alt="Login"
              className="img-fluid rounded logo-image" // Add a CSS class for styling
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            {!isLoggedIn ? (
              <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" target="_blank"to="https://www.facebook.com/esps.tn">
                  Contact
                </Link>
              </li>
              {/* Add other navigation links as needed */}
            </ul>

            

            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              <li
                className="nav-item"
                style={{ marginRight: "10px", marginLeft: "10px" }}
              >
                <form className="d-flex" role="search"></form>
              </li>

              <li
                className="nav-item"
                style={{ marginRight: "10px", marginLeft: "10px" }}
              >
                <Link className="btn btn-primary btn-lg active " to="/login" style={{ backgroundColor: '#224092' }}>
  Connectez-vous
</Link>

              </li>
              <li
                className="nav-item"
                style={{ marginRight: "1px", marginLeft: "1px" }}
              >
                <Link className="btn btn-secondary btn-lg" to="/register"> {/* Use an info blue button */}
                S'inscrire
                </Link>
              </li>
            </ul>
            </>
              ) : (
                <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/accueil">
                      Accueil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Mon Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/demandes">
                      Mes Demandes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" target="_blank"to="https://www.facebook.com/esps.tn">
                      Nous-Contactez
                    </Link>
                  </li>
                  {/* Add other navigation links as needed */}
                </ul>
    
               
    
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                  
                
                  <li className="nav-item" style={{ marginRight: '10px', marginLeft: '10px',marginTop:'10px' }}>
                <form className="d-flex" role="search">
                
                  
                  <h4><VscAccount /> Bienvenue , {name}</h4>
                 
                </form>
              </li>
                  
                  <li
                    className="nav-item"
                    style={{ marginRight: "1px", marginLeft: "1px" }}
                  >
                    <Link className="btn btn-danger btn-lg" onClick={logout}> {/* Use an info blue button */}
                    Se Déconnecter
                    </Link>
                  </li>
                </ul>
                </>
                )}
          </div>
        </div>
      </nav>
     
    </header>
  );
};

export default Header;
