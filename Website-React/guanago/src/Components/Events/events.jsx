import React, { useRef, useEffect, useState } from "react";
import "./events.css";
import img from "../../Assets/img1.jpg";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const googleMapsApiKey = "AIzaSyA2-q3jpNjbRR0dW9tGJICK5mYhMqEeZZo";

const containerStyle = {
  width: "100%",
  height: "200px",
};

// Función para convertir la cadena de coordenadas en un objeto JavaScript
const parseCoordinates = (coordsString) => {
  // Eliminar los espacios en blanco y los caracteres no deseados de la cadena
  const cleanedString = coordsString.replace(/[{}]/g, "").trim();

  // Dividir la cadena en un array de partes separadas por coma
  const parts = cleanedString.split(",");

  // Extraer los valores de latitud y longitud de las partes
  const lat = parseFloat(parts[0].split(":")[1].trim());
  const lng = parseFloat(parts[1].split(":")[1].trim());

  // Retornar un objeto con las coordenadas
  return { lat, lng };
};

const Events = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/guanago/evento/listar-eventos"
      );
      const data = await response.json();

      // Convertir las coordenadas de cadena a objetos JavaScript válidos
      const formattedData = data.map((event) => ({
        ...event,
        coords: parseCoordinates(event.coords),
      }));

      setEvents(formattedData);
      setFilteredEvents(formattedData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const selectedDateString = date.toISOString().slice(0, 10);

    const filtered = events.filter((event) => {
      const eventDateString = event.fecha.slice(0, 10); // Extract date portion
      return eventDateString === selectedDateString;
    });

    setFilteredEvents(filtered);
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <section className="main container section">
        <div className="secTitle">
          <h3 className="title">Eventos próximos</h3>
        </div>
        <div className="dateInput">
          <label className="label" htmlFor="date">
            Elegir fechas:
          </label>
          <div className="input flex">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona una fecha"
            />
          </div>
        </div>
        <div className="eventsDisplay">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="eventCard">
                <img
                  src={event.imagen}
                  alt={event.nombre}
                  className="eventImage"
                />
                <div className="eventDetails">
                  <h4 className="eventName">{event.nombre}</h4>
                  <p className="eventDate">{event.fecha}</p>
                  <p className="eventLocation">{event.lugar}</p>
                  <p className="eventDescription">{event.descripcion}</p>
                </div>
                {event.coords && (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={event.coords}
                    zoom={15}
                  >
                    <Marker position={event.coords} />
                  </GoogleMap>
                )}
              </div>
            ))
          ) : (
            <p>No hay eventos para la fecha seleccionada.</p>
          )}
        </div>
      </section>
    </LoadScript>
  );
};

export default Events;
