import React from 'react';
import "./destination.css";
import img from "../../Assets/img1.jpg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from 'react-icons/fa';
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { Outlet, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Destino from '../../pages/Destino';

const Data = [

];

const Destination = () => {

    const location = useLocation();
    const data = location.state ? location.state.data : [];
    console.log(data)

    return (
        <section className="main container section">
      <div className="secTitle">
        <h3 className="title">Destinos más populares</h3>
      </div>

      {data && data.length > 0 ? (
        <div className="secContent grid">
          {data.map(({ id, imagen_dest, dest_title, lugar, clasificacion, precio, descripcion }) => (
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

                <div className="desc">
                  <p>{descripcion}</p>
                </div>

                <Link to={`/destino/${id}`} className="navLink">
                  <button className="btn flex">
                    RESERVA <HiOutlineClipboardCheck className="icon" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="noDestinations">
          <p>No se encontraron destinos.</p>
        </div>
      )}
    </section>
  );
};

export default Destination;
