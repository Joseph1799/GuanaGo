import React, { useState } from "react";
import "./navbar.css";
import { LuPalmtree } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { TbGridDots } from "react-icons/tb";

const Navbar = () => {
  const [active, setActive] = useState("navBar");

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
          <a href="#" className="logo flex">
            <h1>
              <LuPalmtree className="icon" /> GuanaGo.
            </h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="#" className="navLink">
                Inicio
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                Viajar
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                Eventos
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                Ofertas
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">
                Itinerarios
              </a>
            </li>

            <button className="btn">
              <a href="#">RESERVAR AHORA</a>
            </button>
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
