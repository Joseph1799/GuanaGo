import React, { useRef, useEffect, useState } from 'react';
import "./events.css";
import img from "../../Assets/img1.jpg";
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const googleMapsApiKey = 'AIzaSyA2-q3jpNjbRR0dW9tGJICK5mYhMqEeZZo';

const Data = [
  {
    id: 1,
    name: "Concierto de Rock en Vivo",
    date: "10/04/2024",
    location: "Tamarindo",
    description: "Una noche de rock con las mejores bandas locales e internacionales.",
    image: img,
    coords: { lat: 10.29612960920648, lng: -85.83724546589183 } 
  },
  {
    id: 2,
    name: "Feria Gastronómica Internacional",
    date: "10/04/2024",
    location: "Parque de la Ciudad",
    description: "Degusta platos de todo el mundo y disfruta de un día familiar lleno de sabor.",
    image: img,
    coords: { lat: 9.9333, lng: -84.0833 }
  },
  {
    id: 3,
    name: "Maratón de la Ciudad",
    date: "20/04/2024",
    location: "Centro de la Ciudad",
    description: "Participa en el maratón más grande de la ciudad y corre por una buena causa.",
    image: img,
    coords: { lat: 9.9333, lng: -84.0833 }
  },
  {
    id: 4,
    name: "Exposición de Arte Moderno",
    date: "13/05/2024",
    location: "Galería de Arte Contemporáneo",
    description: "Explora las últimas tendencias del arte moderno en esta exposición exclusiva.",
    image: img,
    coords: { lat: 9.9333, lng: -84.0833 }
  },
  {
    id: 5,
    name: "Festival de Cine Internacional",
    date: "13/04/2024",
    location: "Cineplex Central",
    description: "Descubre las joyas del cine independiente y participa en Q&As con directores.",
    image: img,
    coords: { lat: 9.9333, lng: -84.0833 }
  }
];
const containerStyle = {
  width: '100%',
  height: '200px'
};

const Events = () => {
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(Data);

  // Esta función se llamará cada vez que el usuario seleccione una fecha.
  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    const dateFormat = { day: '2-digit', month: '2-digit', year: 'numeric' };
    
    const filtered = Data.filter(event => {
      // Convierte la fecha seleccionada y las fechas de eventos a un formato comparable
      const eventDateString = new Date(event.date.split('/').reverse().join('-'));
      const selectedDateString = date.toLocaleDateString('en-CA', dateFormat); // 'en-CA' uses YYYY-MM-DD
  
      return eventDateString.toISOString().slice(0, 10) === selectedDateString;
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
          <label className="label" htmlFor="date">Elegir fechas:</label>
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
            filteredEvents.map(event => (
              <div key={event.id} className="eventCard">
                <img src={event.image} alt={event.name} className="eventImage"/>
                <div className="eventDetails">
                  <h4 className="eventName">{event.name}</h4>
                  <p className="eventDate">{event.date}</p>
                  <p className="eventLocation">{event.location}</p>
                  <p className="eventDescription">{event.description}</p>
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
