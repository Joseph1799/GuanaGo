import React, { useEffect } from "react";
import s from "./registrarse.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import {} from "./register-script.js"; // Importar script de validacion (*Por hacer*)
// Iconos de react-icons
import { LuPalmtree } from "react-icons/lu";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";

const Registrarse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <section className={s.login}>
      <div className={`${s.secContent} container`}>
        <div data-aos="fade-up" className={`${s.loginDiv} flex`}>
          <div className={`${s.loginCard} flex`}>
            <div className={`${s.loginIntro} flex`}>
              <div className={`${s.inputDiv} flex`}>
                {/* LOGIN FORM START*/}
                <h2>Registrarse</h2>
                <form onSubmit="">
                  <label htmlFor="username">Correo Electronico:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value=""
                    onChange=""
                    required
                  />
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value=""
                    onChange=""
                    required
                  />
                  <div className={s.buttonDiv}>
                    <button type="submit" className={`${s.btn} flex`}>
                      Ingresar <LuPalmtree className={s.icon} />
                    </button>
                  </div>
                </form>
                {/* LOGIN FORM END*/}

                <div className={s.loginParagraph}>
                  Inicia sesión en Guanago para disfrutar de una experiencia de
                  viaje personalizada.
                </div>

                <div className={`${s.loginSocials} flex`}>
                  <AiOutlineTwitter className={s.icon} />
                  <AiFillYoutube className={s.icon} />
                  <AiFillInstagram className={s.icon} />
                  <FaTripadvisor className={s.icon} />
                </div>
              </div>

              <div className={`${s.loginDiv} flex`}>
                <small>LA MEJOR WEB PARA VIAJES</small>
                <small>DERECHOS RESERVADOS - GUANAGO 2024</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registrarse;
