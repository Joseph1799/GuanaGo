import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./destino.css";
import video from "../../Assets/secondBeach.mp4";
import { Link } from "react-router-dom";
import { RiMessage3Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
// Importar las funciones de resenas.js
import { EnviarResena } from "./resenas.js";
import { obtenerResenasDestino } from "./resenas.js";
import { obtenerDatosDestino } from "./obtenerDestino.js";
import DatePicker from "react-datepicker";

const DestinoComponent = () => {
  const [destinoData, setDestinoData] = useState(null);
  const [mostrarTextarea, setMostrarTextarea] = useState(false);
  const [textoBoton, setTextoBoton] = useState("Agregar Reseña");
  const [nuevaResena, setNuevaResena] = useState("");
  const [resenasDestino, setResenasDestino] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [precio, setPrecio] = useState(0);

  const handleSearch = async () => {
    if (startDate && endDate) {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      // Calcular la diferencia de días entre startDate y endDate
      const diffTime = Math.abs(
        new Date(formattedEndDate) - new Date(formattedStartDate)
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Multiplicar el precio por los días seleccionados
      const nuevoPrecio = precioInicialNumber * diffDays; // Usar precioInicialNumber en lugar de precio

      // Actualizar el estado del precio con el nuevo valor calculado
      setPrecio(nuevoPrecio); // Actualizar el estado del precio
    }
  };

  let { id } = useParams();
  let { precioInicial } = useParams();
  const precioInicialNumber = parseFloat(precioInicial);

  useEffect(() => {
    setPrecio(precioInicialNumber);
  }, []);

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
  }, []);

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
        <div className="filtros">
          <div className="homeContent container">
            <div className="cardDiv">
              <div className="dateInput">
                <label className="label" htmlFor="date">
                  Elegir fechas:
                </label>
                <div className="input flex">
                  <div className="datePicker">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="Fecha de inicio"
                    />
                  </div>
                  <div className="datePicker">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      placeholderText="Fecha final"
                    />
                  </div>
                </div>
              </div>

              <div className="searchOptions flex" onClick={handleSearch}>
                <FaSearch className="icon" />
                <span>Buscar</span>
              </div>
            </div>
          </div>
        </div>
        <div className="destinoCard flex">
          <div className="destinoIntro flex">
            <div className="destinoHeader flex">
              <div className="destinoReservar flex">
                <div className="destinoTitle flex">
                  <h3>{destinoData?.dest_title}</h3>
                </div>
                <div className="reservar">
                  <button className="btn">
                    <Link to={`/reservar/${id}`}>Reservar</Link>
                  </button>
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
                  <h5>₡{Number(precio).toLocaleString("es-CR")}</h5>
                </div>
              </div>
            </div>
            <div className="destinoImage">
              <img className="Image" src={destinoData?.imagen_dest} alt="" />
            </div>

            <div className="destinoParagraph">{destinoData?.descripcion}</div>
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
