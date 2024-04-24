import React, { createContext, useContext, useState } from "react";
import "./navbar.css";
import { LuPalmtree } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { TbGridDots } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { FaUserCircle } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IoIosNotificationsOutline } from 'react-icons/io';


const notificationsData = [
  {
    "id": 1,
    "imagen_dest": "img",
    "dest_title": "Destino en Oferta 1",
    "lugar": "Ubicación del destino en oferta 1",
    "clasificacion": "9.2",
    "impuestos": 13,
    "descripcion": "Descripción del destino en oferta 1",
    "precio": 150000.0,
    "en_oferta": "1",
    "precio_oferta": 30
  },
  {
    "id": 2,
    "imagen_dest": "img",
    "dest_title": "Destino en Oferta 2",
    "lugar": "Ubicación del destino en oferta 2",
    "clasificacion": "8.3",
    "impuestos": 13,
    "descripcion": "Descripción del destino en oferta 2",
    "precio": 110000.0,
    "en_oferta": "1",
    "precio_oferta": 20
  }
];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario

  const login = (userData) => {
    setUser(userData); // Simula establecer el usuario después del login
  };

  const logout = () => {
    setUser(null); // Limpiar el usuario al hacer logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


const Navbar = () => {

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState(notificationsData); // Assume notifications are pre-loaded
  

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const { isLoggedIn, user, logout } = useAuth();
  const [active, setActive] = useState("navBar");

  const handleLogout = () => {
    logout();
  };

  //Funcion para mostrar el menu
  const showNav = () => {
    setActive("navBar activeNavbar");
  };
  //Funcion para cerrar el menu
  const removeNav = () => {
    setActive("navBar");
  };
  const toggleNavbar = () => setActive(!active);
  
  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <Link to="/" className="logo flex">
            <h1>
              <LuPalmtree className="icon" /> GuanaGo.
            </h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/" className="navLink">
                Inicio
              </Link>
            </li>

            <li className="navItem">
              <Link to="/eventos" className="navLink">
                Eventos
              </Link>
            </li>

            <li className="navItem">
              <Link to="/ofertas" className="navLink">
                Ofertas
              </Link>
            </li>

            <li className="navItem">
              <Link to="/itinerarios" className="navLink">
                Itinerarios
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                {user ? ( // Se verifica si 'user' no es undefined antes de acceder a 'user.nombre'
                  <span className="navUser">
                    Bienvenido, {user.nombre}
                  </span>
                ) : null}

                <div className="iconButton" onClick={toggleNotifications}>
                  <IoIosNotificationsOutline />
                  {notifications.length > 0 && (
                    <span className="notification-counter">{notifications.length}</span>
                  )}
                </div>
                {showNotifications && (
                <div className="notifications-dropdown">
                  {notifications.map((notification) => (
                    
                    <div key={notification.id} className="notification-item">
                       <Link to="/ofertas" className="iconButton">
                      <h4>{notification.dest_title}</h4>
                      <p>{notification.descripcion}</p>
                      </Link>
                    </div>
                   
                  ))}
                </div>
              )}

                <Link to="/profile" className="iconButton">
                  <FaUserCircle />
                </Link>
                <button className="btn">
                  <Link to="/misreservas">Mis reservas</Link>
                </button>
                
                <button className="btn" onClick={handleLogout}>
                <Link to="/"></Link>
                  Cerrar Sesión
                </button>

              </>
            ) : (
              <button className="btn">
                <Link to="/login">Iniciar Sesión</Link>
              </button>
            )}
          </ul>

          <div onClick={removeNav} className="closeNavbar">
            <GrClose className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
