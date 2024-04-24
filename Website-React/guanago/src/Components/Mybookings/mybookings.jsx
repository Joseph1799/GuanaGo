import React, { useState, useEffect } from 'react';
import "./mybookings.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from 'react-icons/fa';
import { HiOutlineClipboardCheck } from "react-icons/hi";


const Data = [
  // Aquí puedes añadir datos si es necesario
];

const Mybookings = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      const token = localStorage.getItem('token'); 

      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/guanago/usuarios/destinos-reservados', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error('There was an error fetching the bookings:', error);
        // Aquí puedes manejar la visualización de un mensaje de error
      }
    };

    fetchReservas();
  }, []);


  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 className="title">Mis reservas</h3>
      </div>

      <div className="secContent grid">
        {reservas.map(
          ({ id, imagen_dest, dest_title, lugar, clasificacion, precio, descripcion }) => {
            return (
              <div key={id} className="singleDestination">
                <div className="imageDiv">
                  <img src={imagen_dest} alt={dest_title} />
                </div>

                <div className="cardInfo">
                  <h4 className="dest_title">{dest_title}</h4>
                  <span className="continent flex">
                    <HiOutlineLocationMarker className="icon" />
                    <span className="name">{lugar}</span>
                  </span>

                  <div className="precio flex">
                    <div className="clasificacion">
                      <span>
                        {clasificacion}
                        <small> <FaStar className="icon2" /></small>
                      </span>
                    </div>
                    <div className="price">
                      <h5>Precio: ₡{precio}</h5>
                    </div>
                  </div>

                 

                  <button className="btn flex">
                    Ver reserva 
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default Mybookings;
