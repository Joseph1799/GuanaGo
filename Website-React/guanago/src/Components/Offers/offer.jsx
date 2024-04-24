import React, { useEffect, useState } from 'react';
import "./offer.css";
import img from "../../Assets/img1.jpg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from 'react-icons/fa';
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

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
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:8080/guanago/destinos/en-oferta');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOffers();
  }, []);
 


  return (
    <section className="main container section">
    <div className="secTitle">
      <h3 className="title">Destinos en oferta</h3>
    </div>

    <div className="secContent grid">
      {offers.map(offer => {
        const precioNumerico = parseFloat(offer.precio);
        const descuentoNumerico = parseFloat(offer.precio_oferta);
        const precioFinal = !isNaN(precioNumerico) && !isNaN(descuentoNumerico)
          ? (precioNumerico - (precioNumerico * descuentoNumerico / 100)).toFixed(0)
          : "N/A";

        return (
          <div key={offer.id} className="singleDestination">
            <div className="imageDiv">
              {/* Here you need to adjust the path according to where your images are served from */}
              <img src={offer.imagen_dest} alt={offer.dest_title} />
            </div>

            <div className="cardInfo">
              <h4 className="dest_title">{offer.dest_title}</h4>
              <span className="continent flex">
                <HiOutlineLocationMarker className="icon" />
                <span className="name">{offer.lugar}</span>
              </span>

              <div className="precio flex">
                <div className="price">
                  <h5>Precio:<del> ₡{precioNumerico.toLocaleString()}</del></h5>
                </div>

                {offer.precio_oferta && (
                  <div className="offer">
                    <button className="offerButton">{offer.precio_oferta}% Descuento</button>
                    <div className="finalPrice">Precio final: ₡{precioFinal}</div>
                  </div>
                )}
              </div>

              <div className="desc">
                <p>{offer.descripcion}</p>
              </div>
              <div className="clasificacion">
                <span>
                  {offer.clasificacion}
                  <small> <FaStar className="icon2" /></small>
                </span>
              </div>

                  <Link to={`/destino/${offer.id}`} className="navLink">
                  <button className="btn flex">
                    RESERVA <HiOutlineClipboardCheck className="icon" />
                  </button>
                </Link>
            </div>
          </div>
        );
      })}
    </div>
  </section>
  );
};

export default Offer;
