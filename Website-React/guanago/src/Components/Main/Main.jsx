import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineClipboardCheck } from "react-icons/hi";

const Main = () => {
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    fetchDestinos();
  }, []);

  const fetchDestinos = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/guanago/destinos/listar-6destinos"
      );
      const data = await response.json();
      setDestinos(data);
    } catch (error) {
      console.error("Error fetching destinos:", error);
    }
  };

  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 className="title">Destinos más populares</h3>
      </div>

      <div className="secContent grid">
        {destinos.map(
          ({
            id,
            imagen_dest,
            dest_title,
            lugar,
            clasificacion,
            impuestos,
            precio,
          }) => {
            return (
              <div key={id} className="singleDestination">
                <div className="imageDiv">
                  <img src={imagen_dest} alt="" />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{dest_title}</h4>
                  <span className="continent flex">
                    <HiOutlineLocationMarker className="icon" />
                    <span className="name">{lugar}</span>
                  </span>

                  <div className="fees flex">
                    <div className="grade">
                      <span>
                        {clasificacion}
                        <small>{clasificacion}</small>
                      </span>
                    </div>
                    <div className="price">
                      <h5>₡{Number(precio).toLocaleString("es-CR")}</h5>
                    </div>
                  </div>
                  <Link to={`/destino/${id}/${precio}`} className="navLink">
                    <button className="btn">
                      DETALLES <HiOutlineClipboardCheck className="icon" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default Main;
