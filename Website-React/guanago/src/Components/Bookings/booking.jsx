import React, { useEffect, useState } from 'react';
import "./booking.css";
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Data = [

];

const Booking = () => {
  const [destinationData, setDestinationData] = useState({
    id: '',
    dest_title: '',
    lugar: '',
    clasificacion: '',
    // ... más propiedades según tu API
  });
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const [profileData, setProfileData] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });

  var startDate = localStorage.getItem('startDate');
  var endDate = localStorage.getItem('endDate');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Reemplaza con tu método de autenticación si es diferente
      if (token) {
        try {
          // Usar el ID capturado para hacer la solicitud GET al endpoint correcto
          const response = await fetch(`http://localhost:8080/guanago/destinos/destinoById?destinoId=${id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const destinationData = await response.json();
          setDestinationData(destinationData);
          // Aquí manejas la data de tu destino como necesites

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [id]);


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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

   

    const url = `http://localhost:8080/guanago/usuarios/registrar-destino/${destinationData.id}/${startDate}/${endDate}`;
    console.log(url)

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

        navigate('/'); 
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
            <h2>{destinationData.dest_title}</h2>
            <p>{destinationData.lugar}</p>
            <div className="hotel-rating">
              <div className="rating">
                <i className="icon-star">⭐</i> {/* Sustituye por un ícono adecuado */}
                <span>{destinationData.clasificacion}</span>
              </div>

              <div className="comments-link">
                <Link to={`/destino/${destinationData.id}`}>Ver reseñas</Link>
              </div>
            </div>
            <div className="hotel-amenities">
              <span><i className="icon icon-wifi">📶</i> WiFi gratis</span>
              <span><i className="icon icon-airport-shuttle">🚐</i> Traslado aeropuerto</span>
              <span><i className="icon icon-parking">🅿️</i> Parking</span>
              <span><i className="icon icon-restaurant">🍴</i> Restaurante</span>
              <span><i className="icon icon-pool">🏊</i> Piscina</span>
            </div>
            {/* Si hay una oferta, mostrar el precio de oferta */}
            {destinationData.en_oferta === "1" && (
              <div className="hotel-offer">
                <span>¡Oferta especial! Antes: {destinationData.precio} Ahora: {destinationData.precio_oferta}</span>
              </div>
            )}
          </div>


          {/* Tarjeta de detalles de la reserva */}
        <div className="card booking-details-card">
            <h3>Los datos de tu reserva</h3>
            <div className="reservation-dates">
              <div>
                <strong>Entrada:</strong>
                <p>{startDate ? new Date(startDate).toLocaleDateString() : 'Fecha no especificada'}</p>
              </div>
              <div>
                <strong>Salida:</strong>
                <p>{endDate ? new Date(endDate).toLocaleDateString() : 'Fecha no especificada'}</p>
              </div>
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
              <h3>Forma de pago</h3>
              <div className="payment-form">
                <div className="form-group">
                  <label htmlFor="cardNumber">Número de tarjeta *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 1234 1234 1234"
                    pattern="\d{16}"
                    maxLength="16"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardName">Nombre en la tarjeta *</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    placeholder="Nombre Apellido"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="expiryDate">Fecha de vencimiento *</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/AA"
                      pattern="\d{2}/\d{2}"
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="cvc">CVC *</label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      placeholder="CVC"
                      pattern="\d{3,4}"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>
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
