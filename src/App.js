import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeUser from "./pages/User/HomeUser";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./Hooks/loader";
import Admin from "./admin/Admin";

import Dfetch from "./pages/User/Dfetch";
import Pfetch from "./pages/User/Pfetch";
import Ddemande from "./pages/User/Ddemande";

function App() {
  const [name, setName] = useState("");
  return (
    <>
     <ToastContainer/>
      <BrowserRouter>
        <Header setName={setName}/>
        <Routes>
        =
          <Route path="/" element={<Home />} />
          <Route path="/accueil" element={<Dfetch/>} />
          <Route path="/profile" element={<Pfetch/>} />
          <Route path="/load" element={<Loader/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/preinscription" element={<HomeUser />} />
          <Route path="/demandes" element={<Ddemande/>} />

          <Route
            path="/admin/*"
            element={
              
                <Admin />
              
            }
          />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
