import React, { useEffect, useState } from 'react';
import "./booking.css";
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const Data = [
 
  ];

const Booking = () => {
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const [profileData, setProfileData] = useState({
    nombre: '',
    apellido: '',
    email: '', 
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch("http://localhost:8080/guanago/usuarios/datos-usuario", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          // Actualiza el estado con los datos del usuario
          setProfileData({
            nombre: data.nombre || '',
            apellido: data.apellido || '',
            email: data.email || '',
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.error('No token found in localStorage');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  // Manejador para el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); 
    const url = "http://localhost:8080/guango/usuarios/registrar-destino/1/2024-05-01/2024-05-07";

    if (token) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          //body: JSON.stringify(bookingDetails),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Aquí puedes manejar la respuesta. Por ejemplo:
        const data = await response.json();
        Swal.fire({
          title: '¡Reserva Exitosa!',
          text: 'Tu reserva ha sido confirmada.',
          icon: 'success',
          confirmButtonText: 'Genial'
        });
        console.log(data);
      } catch (error) {
        console.error('Error during the fetch operation:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo completar la reserva.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    } else {
      Swal.fire({
        title: 'No Autorizado',
        text: 'Debes estar registrado y logueado para realizar una reserva.',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      });
    }
  };
  

  return (
    <section className="main container section">
    <div className="booking-container">
      

        {/* Columna de la izquierda para tarjetas de información */}
        <div className="left-column">
  {/* Tarjeta de información del hotel */}
  <div className="card hotel-info-card">
    <h2>Hotel Banana </h2>
    <p>Playa Negra, 70435 Puerto Viejo, Costa Rica</p>
    <p>Excelente ubicación — 9.0</p>
    <div className="hotel-rating">
      <span>8.5</span>
      <span>Muy bien - 797 comentarios</span>
    </div>
    <div className="hotel-amenities">
      <span>WiFi gratis</span>
      <span>Traslado aeropuerto</span>
      <span>Parking</span>
      <span>Restaurante</span>
      <span>Piscina</span>
    </div>
  </div>

  {/* Tarjeta de detalles de la reserva */}
  <div className="card booking-details-card">
    <h3>Los datos de tu reserva</h3>
    <div className="reservation-dates">
      <div>
        <strong>Entrada</strong>
        <p>mar, 7 may 2024</p>
        <p>De 14:00</p>
      </div>
      <div>
        <strong>Salida</strong>
        <p>mié, 8 may 2024</p>
        <p>A 12:00</p>
      </div>
    </div>
    <div className="stay-duration">
      <strong>Duración total de la estancia:</strong>
      <p>1 noche</p>
    </div>
    <div className="room-selection">
      <strong>Has seleccionado</strong>
      <p>1 habitación para 2 adultos</p>
    </div>
    <div className="change-selection">
      <button>Cambia tu selección</button>
    </div>
  </div>
</div>
      
        <div className="right-column">
      {/* Sección de información del usuario */}
      <div className="user-session-info">
      <div className="card user-session-info">
          <p>Has iniciado sesión como:</p>
          <p>{profileData.email}</p>
        </div>
      </div>

      {/* Formulario de reserva */}
      <div className="card booking-form">
        <div className="form-header">
          <h3>Tus datos</h3>
          <p>¡Ya casi estás! *</p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Nombre y apellido */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input 
              type="text" 
              id="nombre"
              name="nombre" 
              value={profileData.nombre} 
              onChange={handleChange} 
              disabled={!isEditing}
            />
            <label htmlFor="apellido">Apellido *</label>
            <input 
              type="text" 
              id="apellido"
              name="apellido" 
              value={profileData.apellido} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">E-mail *</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={profileData.email} 
              onChange={handleChange} 
              disabled={!isEditing}
            />
          </div>


          <button type="submit" className="submit-button">Reservar</button>
        </form>
      </div>
      </div>
    </div>
  </section>
  );
};

export default Booking;
