import React from "react";
import "./footer.css";
import video from "../../Assets/Footer.mp4";
import { FiSend } from "react-icons/fi";
import { LuPalmtree } from "react-icons/lu";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const Footer = () => {
  return (
    <section className="footer">
      <div className="videoDiv">
        <video src={video} loop autoPlay muted type=""></video>
      </div>

      <div className="secContent container">
        <div className="contactDiv flex">
          <div className="text">
            <small>MANTENGASE EN CONTACTO</small>
            <h2>Viaja con nosotros</h2>
          </div>

          <div className="inputDiv flex">
            <input type="text" placeholder="Ingresa el Email" />
            <button className="btn flex" type="submit">
              ENVIAR <FiSend className="icon" />
            </button>
          </div>
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="#" className="logo flex">
                <LuPalmtree className="icon" />
                GuanaGo.
              </a>
            </div>

            <div className="footerParagraph">
              Descubre la belleza de Guanacaste con Guanago, tu guía de viaje
              completa. Encuentra los mejores destinos, actividades y hospedajes
              en esta región costarricense. ¡Explora la naturaleza, la cultura y
              la aventura que Guanacaste tiene para ofrecerte!
            </div>

            <div className="footerSocials flex">
              <AiOutlineTwitter className="icon" />
              <AiFillYoutube className="icon" />
              <AiFillInstagram className="icon" />
              <FaTripadvisor className="icon" />
            </div>
          </div>

          {/* PRIMER GRUPO */}
          <div className="footerLinks grid">
            <div className="linkGroup">
              <span className="groupTitle">NUESTRA AGENCIA</span>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Servicios
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Seguros
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Agencia
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Turismo
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Pagos
              </li>
            </div>

            {/* SEGUNDO GRUPO */}
            <div className="linkGroup">
              <span className="groupTitle">SOCIOS</span>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Bookings
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Kayak
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Airbnb
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Trivago
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                TripAdvisor
              </li>
            </div>

            {/* TERCER GRUPO */}
            <div className="linkGroup">
              <span className="groupTitle">Top Destinos</span>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Tamarindo
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Nosara
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Playa Grande
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Playa Flamingo
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Sámara
              </li>
            </div>

            <div className="footerDiv flex">
              <small>LA MEJOR WEB PARA VIAJES</small>
              <small>DERECHOS RESERVADOS - GUANAGO 2024</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
