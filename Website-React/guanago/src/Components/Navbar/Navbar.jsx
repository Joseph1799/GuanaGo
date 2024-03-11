import React, { useState } from "react";
import "./navbar.css";
import { LuPalmtree } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { TbGridDots } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
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
              <button className="btn" onClick={handleLogout}>
                Cerrar Sesión
              </button>
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
