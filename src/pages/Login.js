import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import {Redirect} from "react-router-dom";
import { toast } from "react-toastify";
import loginImg from "../images/1.png";
import logoImg from "../images/signin.png";
import { TbLogin2 } from "react-icons/tb";
const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate=useNavigate();
  const submit = async (e) => { // Added the missing 'e' parameter
    e.preventDefault();

    const response = await fetch('http://localhost:5135/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        
        email,
        password
      })
    });

    const content = await response.json();
    if (content.message=="success"){
      toast.success("Login Successfully");
      setRedirect(true);
    }
    else
    {
      toast.error("Invalid Credentials")
    }
    
   
  };

  if (redirect) {
   
    navigate("/load")
  }

  return (
    <section className="container">
     
      <div className="row d-flex align-items-center">
        <div className="col-md-6">
          <img src={logoImg} alt="Login" className="img-fluid" />
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title"> <TbLogin2 /> Login</h2>

              <form onSubmit={submit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <Link to="/reset">[Forgot your password ?]</Link>
                  <p> </p>
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>

              <div className="mt-3">
                <Link className="btn btn-secondary" to="/register">
                  Don't have an account? Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </section>
  );
};

export default Login;
