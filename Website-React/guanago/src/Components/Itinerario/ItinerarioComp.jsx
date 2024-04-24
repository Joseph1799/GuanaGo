import React, { useState, useEffect } from "react";
import "./ItinerarioComp.css";
import DatePicker from "react-datepicker";
import obtenerItinerarios from "./obtenerItinerario";
import DestinosReservados from "./obtenerDestinosUsuario";
import GuardarItinerario from "./crearItinerario";
import EditarItinerario from "./editarItinerario";
import eliminarItinerario from "./eliminarItinerario";
import Swal from "sweetalert2";

const ItinerarioComp = () => {
  const [itinerarios, setItinerarios] = useState([]);
  const [destinosReservados, setDestinosReservados] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nombreLugar, setNombreLugar] = useState("");
  const [ciudadDestino, setCiudadDestino] = useState("");
  const [actividades, setActividades] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [destinoId, setDestinoId] = useState("");
  const [modificar, setModificar] = useState(false);
  const [itinerarioId, setItinerarioId] = useState("");
  const token = localStorage.getItem("token");

  const cargarItinerarios = () => {
    obtenerItinerarios(token)
      .then((data) => {
        setItinerarios(data);
      })
      .catch((error) => {
        console.error("Error al obtener itinerarios:", error);
      });
  };

  // useEffect para cargar los itinerarios al inicio
  useEffect(() => {
    cargarItinerarios();
  }, [token]); // Ejecuta el efecto cada vez que cambie el token

  useEffect(() => {
    DestinosReservados(token)
      .then((data) => {
        setDestinosReservados(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Función para manejar el cambio en el campo de entrada de nombreLugar
  const handleNombreLugarChange = (e) => {
    setNombreLugar(e.target.value);
  };

  // Función para manejar el cambio en el campo de entrada de ciudadDestino
  const handleCiudadDestinoChange = (e) => {
    setCiudadDestino(e.target.value);
  };

  // Función para manejar el cambio en el campo de selección de actividades
  const handleActividadesChange = (e) => {
    setActividades(e.target.value);
  };

  // Función para manejar el cambio en el campo de fecha de inicio
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // Función para manejar el cambio en el campo de fecha de fin
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Función para manejar el cambio en el campo de entrada de descripción
  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  // Función para manejar el cambio en el campo de selección de destinoId
  const handleDestinoIdChange = (e) => {
    setDestinoId(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formato de fecha según el idioma y región del navegador
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCancel = () => {
    setShowForm(false);
    setNombreLugar("");
    setCiudadDestino("");
    setActividades("");
    setStartDate(null);
    setEndDate(null);
    setDescripcion("");
    setDestinoId("");
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarItinerario(id, token);
      cargarItinerarios();
    } catch (error) {
      console.error("Error al eliminar el itinerario:", error);
    }
  };

  const handleEditar = () => {
    setModificar(true);
  };

  const handleNuevo = () => {
    setModificar(false);
    setNombreLugar("");
    setCiudadDestino("");
    setActividades("");
    setStartDate(null);
    setEndDate(null);
    setDescripcion("");
    setDestinoId("");
  };

  const handleGuardar = async () => {
    handleToggleForm();
    if (modificar === false) {
      if (
        !nombreLugar ||
        !descripcion ||
        !startDate ||
        !endDate ||
        !ciudadDestino ||
        !actividades ||
        !destinoId
      ) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No se pudo guardar el itinerario",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      const data = {
        nombre_lugar: nombreLugar,
        descripcion: descripcion,
        fecha_inicio: startDate.toISOString().split("T")[0],
        fecha_fin: endDate.toISOString().split("T")[0],
        ciudad_destino: ciudadDestino,
        pais_destino: "Costa Rica",
        actividades: actividades,
        destino: {
          id: destinoId ? parseInt(destinoId) : null, // Convertir a entero si no es nulo
        },
      };
      await GuardarItinerario(data, token);
      cargarItinerarios();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Itinerario guardado",
        showConfirmButton: false,
        timer: 1500,
      });
      setNombreLugar("");
      setCiudadDestino("");
      setActividades("");
      setStartDate(null);
      setEndDate(null);
      setDescripcion("");
      setDestinoId("");
    } else {
      if (
        !nombreLugar ||
        !descripcion ||
        !startDate ||
        !endDate ||
        !ciudadDestino ||
        !actividades ||
        !destinoId
      ) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No se pudo guardar el itinerario",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      const updateData = {
        id: itinerarioId,
        nombre_lugar: nombreLugar,
        descripcion: descripcion,
        fecha_inicio: startDate.toISOString().split("T")[0],
        fecha_fin: endDate.toISOString().split("T")[0],
        ciudad_destino: ciudadDestino,
        pais_destino: "Costa Rica",
        actividades: actividades,
        destino: {
          id: destinoId ? parseInt(destinoId) : null, // Convertir a entero si no es nulo
        },
      };
      await EditarItinerario(updateData, token);
      cargarItinerarios();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Itinerario editado",
        showConfirmButton: false,
        timer: 1500,
      });
      setNombreLugar("");
      setCiudadDestino("");
      setActividades("");
      setStartDate(null);
      setEndDate(null);
      setDescripcion("");
      setDestinoId("");
    }
  };

  return (
    <div className="itinerario-container">
      <div className="secContent grid">
        {itinerarios.map(
          ({
            id,
            nombre_lugar,
            pais_destino,
            ciudad_destino,
            fecha_inicio,
            fecha_fin,
            actividades,
            descripcion,
            destino,
          }) => (
            <div key={id} className="singleDestination">
              <div className="cardInfo">
                <h4 className="destTitle">{nombre_lugar}</h4>
                <span className="continent flex">
                  <span className="name">
                    {ciudad_destino}, {pais_destino}
                  </span>
                </span>
                <div>
                  <span className="continent">
                    <span className="name">Actividad: {actividades}</span>
                  </span>
                </div>
                <div className="fees flex">
                  <div className="fechas">
                    <span>{formatDate(fecha_inicio)}</span>
                  </div>
                  <div className="fechas">
                    <span>{formatDate(fecha_fin)}</span>
                  </div>
                </div>

                <div className="desc">
                  <p>
                    Descripción: <br /> {descripcion}
                  </p>
                </div>

                <div className="dest">
                  <p>
                    Detino Reservado: <br /> {destino.dest_title}
                  </p>
                </div>
                <div className="flex">
                  <button
                    className="btnSecondary flex"
                    onClick={() => {
                      setItinerarioId(id);
                      setActividades(actividades);
                      setNombreLugar(nombre_lugar);
                      setCiudadDestino(ciudad_destino);
                      setStartDate(new Date(fecha_inicio));
                      setEndDate(new Date(fecha_fin));
                      setDescripcion(descripcion);
                      handleToggleForm();
                      handleEditar();
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btnSecondaryDanger flex"
                    onClick={() => {
                      handleEliminar(id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {showForm && (
          <div id="nuevo-itin" className="NewDestination">
            <div className="cardInfo">
              <input
                type="text"
                name="nombre_lugar"
                placeholder="Nombre del Lugar"
                required
                value={nombreLugar}
                onChange={handleNombreLugarChange}
              />
              <span className="continent flex">
                <input
                  type="text"
                  name="ciudad_destino"
                  placeholder="Ciudad Destino"
                  required
                  value={ciudadDestino}
                  onChange={handleCiudadDestinoChange}
                />
              </span>

              <div>
                <span className="continent">
                  <select
                    name="actividades"
                    id="actividades"
                    required
                    value={actividades}
                    onChange={handleActividadesChange}
                  >
                    <option value="">Selecciona una Actividad</option>
                    <option value="Exploración de Parques Nacionales">
                      Exploración de Parques Nacionales
                    </option>
                    <option value="Surfing">Surfing</option>
                    <option value="Observación de la Vida Silvestre">
                      Observación de la Vida Silvestre
                    </option>
                    <option value="Tirolesa y Canopy Tours">
                      Tirolesa y Canopy Tours
                    </option>
                    <option value="Paseos a Caballo">Paseos a Caballo</option>
                    <option value="Buceo y Snorkel">Buceo y Snorkel</option>
                    <option value="Pesca Deportiva">Pesca Deportiva</option>
                    <option value="Visitas Culturales">
                      Visitas Culturales
                    </option>
                    <option value="Avistamiento de Aves">
                      Avistamiento de Aves
                    </option>
                    <option value="Rappel en Cascadas">
                      Rappel en Cascadas
                    </option>
                    <option value="Visita a Reservas Biológicas">
                      Visita a Reservas Biológicas
                    </option>
                    <option value="Tour en Cuadraciclos">
                      Tour en Cuadraciclos
                    </option>
                    <option value="Kayak en Ríos y Manglares">
                      Kayak en Ríos y Manglares
                    </option>
                    <option value="Visita a Haciendas de Café">
                      Visita a Haciendas de Café
                    </option>
                    <option value="Caminatas Nocturnas">
                      Caminatas Nocturnas
                    </option>
                    <option value="Clases de Cocina Costarricense">
                      Clases de Cocina Costarricense
                    </option>
                    <option value="Observación de Tortugas Marinas">
                      Observación de Tortugas Marinas
                    </option>
                    <option value="Recorridos en Bicicleta de Montaña">
                      Recorridos en Bicicleta de Montaña
                    </option>
                    <option value="Excursiones en Balsas por Ríos">
                      Excursiones en Balsas por Ríos
                    </option>
                    <option value="Observatorio de Estrellas">
                      Observatorio de Estrellas
                    </option>
                    <option value="Fotografía de Naturaleza">
                      Fotografía de Naturaleza
                    </option>
                    <option value="Rodeos Tradicionales">
                      Rodeos Tradicionales
                    </option>
                    <option value="Visitas a Plantaciones de Caña de Azúcar">
                      Visitas a Plantaciones de Caña de Azúcar
                    </option>
                    <option value="Talleres de Artesanía Local">
                      Talleres de Artesanía Local
                    </option>
                    <option value="Excursiones de Observación de Monos">
                      Excursiones de Observación de Monos
                    </option>
                    <option value="Clases de Yoga y Meditación">
                      Clases de Yoga y Meditación
                    </option>
                  </select>
                </span>
              </div>

              <div className="fees flex">
                <div className="nuevas-fechas">
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Inicio"
                    className="date-input"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div className="nuevas-fechas">
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="Fin"
                    className="date-input"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>

              <div className="desc">
                <span className="continent flex">
                  <textarea
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                    required
                    value={descripcion}
                    onChange={handleDescripcionChange}
                  />
                </span>
              </div>

              <select
                name="destino_id"
                id="destino_id"
                required
                value={destinoId}
                onChange={handleDestinoIdChange}
              >
                <option value="">Selecciona un Destino Reservado</option>
                {destinosReservados.length === 0 ? (
                  <option value="">No ha reservado ningún destino</option>
                ) : (
                  destinosReservados.map((destino) => (
                    <option key={destino.id} value={destino.id}>
                      {destino.dest_title}
                    </option>
                  ))
                )}
              </select>
              <div className="nuevo-dest flex">
                <button className="btnSecondary" onClick={handleGuardar}>
                  Guardar
                </button>
                <button className="btnSecondaryDanger" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          className={`btn ${showForm ? "hidden" : ""}`}
          onClick={() => {
            handleToggleForm();
            handleNuevo();
          }}
          style={{ display: showForm ? "none" : "inline-block" }}
        >
          Nuevo +
        </button>
      </div>
    </div>
  );
};

export default ItinerarioComp;
