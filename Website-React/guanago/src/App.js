import React from "react";
import "./app.css";
import Login from "./pages/Login.js";
import Inicio from "./pages/Inicio.js";
import Eventos from "./pages/Eventos.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
