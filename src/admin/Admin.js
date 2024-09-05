import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import ListUsers from "./users/ListUsers";
import AddStage from "./stage/AddStage";
import ListStage from "./stage/ListStage";

import ListDemande from "./demande/ListDemande";



const Admin = () => {
  return (
    <div className="navbar navbar-expand-lg bg">
        <div className="container-fluid">
      <div className="row">
        <div className="col-md-2=">
          <div className="navbar">
            <Navbar/>
          </div>
        </div>
       
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/users" element={<ListUsers/>} />
            <Route path="/add" element={<AddStage/>} />
            <Route path="/list" element={<ListStage/>} />
            <Route path="/demandes" element={<ListDemande/>} />
          </Routes>
       
      </div>
      </div>
    </div>
  );
};

export default Admin;
