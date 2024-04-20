import React from "react";
import "./app.css";
import Login from "./pages/Login.js";
import Inicio from "./pages/Inicio.js";
import Eventos from "./pages/Eventos.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Ofertas from "./pages/Ofertas.js";
import Itinerarios from "./pages/Itinerarios.js";
import Registrarse from "./pages/Registrarse.js";
import Destino from "./pages/Destino.js";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/itinerarios" element={<Itinerarios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/destino" element={<Destino />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
