import React, { useState, useEffect } from "react";
import "./destino.css";
import { useParams } from 'react-router-dom';
import video from "../../Assets/secondBeach.mp4";
import { RiMessage3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
// Importar las funciones de resenas.js
import { EnviarResena } from "./resenas.js";
import { obtenerResenasDestino } from "./resenas.js";
import { obtenerDatosDestino } from "./obtenerDestino.js";
import { IoIosArrowBack } from 'react-icons/io';

const DestinoComponent = () => {
  const { id } = useParams();
  const [destinoData, setDestinoData] = useState(null);
  const [mostrarTextarea, setMostrarTextarea] = useState(false);
  const [textoBoton, setTextoBoton] = useState("Agregar Reseña");
  const [nuevaResena, setNuevaResena] = useState("");
  const [resenasDestino, setResenasDestino] = useState([]);

  useEffect(() => {
    obtenerResenas(); // Llamar a la función para obtener las reseñas cuando el componente se monta
  });

  const obtenerResenas = async () => {
    const resenas = await obtenerResenasDestino(id); // Pasar el ID del destino para obtener las reseñas
    setResenasDestino(resenas);
  };

  useEffect(() => {
    // Llamar a la función para obtener los datos del destino cuando el componente se monta
    const fetchData = async () => {
      const data = await obtenerDatosDestino(id); // Pasa el ID del destino deseado
      setDestinoData(data); // Establece los datos del destino en el estado
    };

    fetchData();
  }, [id]);

  const toggleTextarea = () => {
    if (textoBoton === "Agregar Reseña") {
      setMostrarTextarea(!mostrarTextarea);
      setTextoBoton(mostrarTextarea ? "Agregar Reseña" : "Enviar");
    } else if (nuevaResena !== "") {
      EnviarResena(nuevaResena);
      setNuevaResena("");
      setMostrarTextarea(!mostrarTextarea);
      setTextoBoton(mostrarTextarea ? "Agregar Reseña" : "Enviar");
      obtenerResenas();
    } else {
      console.error("La reseña no puede estar vacía");
    }
  };

  const handleInputChange = (event) => {
    setNuevaResena(event.target.value);
  };

  return (
    <section className="destino">
      <div className="videoDiv">
        <video src={video} loop autoPlay muted type=""></video>
      </div>

      <div className="secContent container">

        <div className="destinoCard flex">
          <div className="destinoIntro flex">
            <div className="destinoHeader flex">
              <div className="destinoReservar flex">
                <div className="destinoTitle flex">
                 
                  <h3>{destinoData?.dest_title}</h3>
                </div>
                <div className="backButton">

                </div>
                <div className="reservar">
                  <button className="btn"><Link to={`/reservar/${id}`}>Reservar</Link></button>
                </div>
              </div>
            </div>

            <div className="destinoLocation flex">
              <div className="lugarHeader flex">
                <div className="calificacion">
                  <span>
                    {destinoData?.lugar}
                    <small>{destinoData?.clasificacion}</small>
                  </span>
                </div>
                <div className="precio">
                  <h5>₡{destinoData?.precio}</h5>
                </div>
              </div>
            </div>
            <div className="destinoImage">
              <img className="Image" src={destinoData?.imagen_dest} alt="" />
            </div>
            
            <div className="destinoParagraph">{destinoData?.descripcion} </div><Link to="/" className="btnBack">
                    <IoIosArrowBack className="backIcon" /> Regresar a inicio
                  </Link>
          </div>

          {/* PRIMER GRUPO */}
          
          <div className="destinoLinks ">
          
            <div className="linkGroup">
              
              <span className="groupTitle">Reseñas</span>
              <div className="resenasDiv">
                <RiMessage3Fill className="icon" />
                {resenasDestino &&
                  resenasDestino.map((resena, index) => (
                    <li key={index} className="destinoList flex">
                      {resena}
                    </li>
                  ))}
              </div>

              {mostrarTextarea && (
                <textarea
                  placeholder="Escribe aquí..."
                  value={nuevaResena}
                  onChange={handleInputChange}
                ></textarea>
              )}
              <button className="btnSecondary" onClick={toggleTextarea}>
                {textoBoton}
              </button>
            </div>
            <div className="destinoDiv flex">
              <small>LA MEJOR WEB PARA VIAJES</small>
              <small>DERECHOS RESERVADOS - GUANAGO 2024</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinoComponent;
