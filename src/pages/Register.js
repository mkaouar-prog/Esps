import React from "react";

import logoImg from "../images/signin.png";
import { IoIosAddCircleOutline } from "react-icons/io";

import { useState } from "react";


import { Link, useNavigate } from "react-router-dom";


import { toast } from "react-toastify";





const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
  
    const navigate = useNavigate();
  
    const submit = async (e) => {
        e.preventDefault();
        if (password !== cPassword) {
            toast.error("Passwords do not match.");
            return;
        }
          
        const response =await fetch('http://localhost:5135/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                name,
                email,
                password
            })
            
            
        });
        const content = await response.json();
        if (content)
        {
          toast.success("Registration Successful...");
          setRedirect(true);
        }
        

      
     
        
       
        
    };
    if (redirect) {
       
        navigate("/login");
      }
  return (
    <>
    
   
    <section className="container">
      <div className="row d-flex align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title"><IoIosAddCircleOutline /> Register</h2>

              <form  onSubmit={submit}>
              <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Full Name" required  value={name}
                onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Email" required  value={email}
                onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Password" required value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    required
                    value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary"  >SignUp</button>
              </form>

              <div className="mt-3">
               
               <Link className="btn btn-secondary" to="/login">Already Have Account ? Login</Link>
               
             </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="img">
            <img src={logoImg} alt="Register" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Register;
