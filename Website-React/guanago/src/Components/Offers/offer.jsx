import React from 'react';
import "./offer.css";
import img from "../../Assets/img1.jpg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from 'react-icons/fa';
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { useLocation } from 'react-router-dom';

const Data = [
  {
    "id": 1,
    "imagen_dest": img,
    "dest_title": "Destino en Oferta 1",
    "lugar": "Ubicación del destino en oferta 1",
    "clasificacion": "9.2",
    "impuestos": 13,
    "descripcion": "Descripción del destino en oferta 1",
    "precio": 150000.0,
    "en_oferta": "1",
    "precio_oferta": 30
  },
  {
    "id": 2,
    "imagen_dest": img,
    "dest_title": "Destino en Oferta 2",
    "lugar": "Ubicación del destino en oferta 2",
    "clasificacion": "8.3",
    "impuestos": 13,
    "descripcion": "Descripción del destino en oferta 2",
    "precio": 110000.0,
    "en_oferta": "1",
    "precio_oferta": 20
  },
  {
    "id": 3,
    "imagen_dest": img,
    "dest_title": "Destino en Oferta 3",
    "lugar": "Ubicación del destino en oferta 2",
    "clasificacion": "8.3",
    "impuestos": 13,
    "descripcion": "Descripción del destino en oferta 2",
    "precio": 110000.0,
    "en_oferta": "1",
    "precio_oferta": 20
  }
];

const Offer = () => {

  const location = useLocation();
  const data = location.state ? location.state.data : [];

 


  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 className="title">Destinos en oferta</h3>
      </div>

      <div className="secContent grid">
        {Data.map(offer => { 
           const precioNumerico = parseFloat(offer.precio);
           const descuentoNumerico = parseFloat(offer.precio_oferta);
         
           // Verifica que 'precio' y 'descuento' no sean NaN antes de calcular el precio final
           const precioFinal = !isNaN(precioNumerico) && !isNaN(descuentoNumerico) 
             ? (precioNumerico - (precioNumerico * descuentoNumerico / 100)).toFixed(0) 
             : "N/A";// Asegúrate de que 'Data' contenga los objetos con los datos correctos
          const { id, imagen_dest, dest_title, lugar, clasificacion, precio, descripcion, precio_oferta } = offer;
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

                  <div className="price">
                    <h5>Precio:<del> ₡{precio}</del></h5>

                  </div>

                  {precio_oferta && (
                    <div className="offer">
                      <button className="offerButton">{precio_oferta}% Descuento</button>
                      <div className="finalPrice">Precio final: ₡{precioFinal}</div>
                    </div>
                  )}
                </div>

                <div className="desc">
                  <p>{descripcion}</p>
                </div>
                <div className="clasificacion">
                  <span>
                    {clasificacion}
                    <small> <FaStar className="icon2" /></small>
                  </span>
                </div>

                <button className="btn flex">
                  RESERVA <HiOutlineClipboardCheck className="icon" />
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

export default Offer;
