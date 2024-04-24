import React from "react";
import "./app.css";
import Login from "./pages/Login.js";
import Inicio from "./pages/Inicio.js";
import Eventos from "./pages/Eventos.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Ofertas from "./pages/Ofertas.js";
import Itinerarios from "./pages/Itinerarios.js";
import Destinos from "./pages/Destinos.js";
import Registrarse from "./pages/Registrarse.js";
import Perfil from "./pages/Perfil.js";
import Misreservas from "./pages/Misreservas.js";
import Destino from "./pages/Destino.js";
import Reservar from "./pages/Reservar.js";


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/itinerarios" element={<Itinerarios />} />
          <Route path="/profile" element={<Perfil />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/misreservas" element={<Misreservas />} />
          <Route path="/destinos" element={<Destinos />} /> 
          <Route path="/destino/:id" element={<Destino />} />
          <Route path="/reservar/:id" element={<Reservar />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
