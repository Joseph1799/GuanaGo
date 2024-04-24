import React, { useEffect,useState } from "react";
import s from "./registrarse.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext.js";
import {} from "./register-script.js"; // Importar script de validacion (*Por hacer*)
// Iconos de react-icons
import { LuPalmtree } from "react-icons/lu";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import Login from "../Login/Login.jsx";


const Registrarse = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 1000 });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/guanago/usuarios/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          contrasena,
          nombre,
          apellido
        }),
      });

      if (response.ok) {
        // Si la respuesta es exitosa, manejar según sea necesario
        alert('Registro exitoso. Serás redirigido al inicio de sesión.');
        navigate('/login');
      } else {
        // Manejo de respuestas de error del servidor
        const errorData = await response.json();
        alert(`Error al registrar: ${errorData.message}`); 
        // Aquí podrías establecer un estado de error para mostrar un mensaje al usuario
      }
    } catch (error) {
      alert(`Error al registrar: ${error.message}`);      // Manejo de errores de fetch aquí
    }
  };

  return (
    <section className={s.login}>
      <div className={`${s.secContent} container`}>
        <div data-aos="fade-up" className={`${s.loginDiv} flex`}>
          <div className={`${s.loginCard} flex`}>
            <div className={`${s.loginIntro} flex`}>
              <div className={`${s.inputDiv} flex`}>
              <h2>Registrarse</h2>
<form onSubmit={handleSubmit}>
<label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <label htmlFor="firstname">Nombre:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <label htmlFor="lastname">Apellido:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
  <div className={s.buttonDiv}>
    <button type="submit" className={`${s.btn} flex`}>
      Registrarse {/* Aquí iría el componente del icono si es necesario */}
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
