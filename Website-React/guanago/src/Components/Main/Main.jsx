import React from "react";
import "./main.css";
import img from "../../Assets/img1.jpg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { Outlet, Link } from "react-router-dom";

const Data = [
  {
    id: 1,
    imgSrc: img,
    destTitle: "Tamarindo Diria Beach Resort",
    location: "Tamarindo",
    grade: "CULTURAL RELAX",
    fees: "₡17000",
    description:
      "El Tamarindo Diria Beach Resort está ubicado en una zona con encanto junto a la playa de Tamarindo y tiene 3 piscinas al aire libre con vistas al océano Pacífico. Además, este gran complejo alberga 4 restaurantes, 4 bares, spa y casino.",
  },

  {
    id: 2,
    imgSrc: img,
    destTitle: "Tamarindo Diria Beach Resort",
    location: "Tamarindo",
    grade: "CULTURAL RELAX",
    fees: "₡17000",
    description:
      "El Tamarindo Diria Beach Resort está ubicado en una zona con encanto junto a la playa de Tamarindo y tiene 3 piscinas al aire libre con vistas al océano Pacífico. Además, este gran complejo alberga 4 restaurantes, 4 bares, spa y casino.",
  },

  {
    id: 3,
    imgSrc: img,
    destTitle: "Tamarindo Diria Beach Resort",
    location: "Tamarindo",
    grade: "CULTURAL RELAX",
    fees: "₡17000",
    description:
      "El Tamarindo Diria Beach Resort está ubicado en una zona con encanto junto a la playa de Tamarindo y tiene 3 piscinas al aire libre con vistas al océano Pacífico. Además, este gran complejo alberga 4 restaurantes, 4 bares, spa y casino.",
  },

  {
    id: 4,
    imgSrc: img,
    destTitle: "Tamarindo Diria Beach Resort",
    location: "Tamarindo",
    grade: "CULTURAL RELAX",
    fees: "₡17000",
    description:
      "El Tamarindo Diria Beach Resort está ubicado en una zona con encanto junto a la playa de Tamarindo y tiene 3 piscinas al aire libre con vistas al océano Pacífico. Además, este gran complejo alberga 4 restaurantes, 4 bares, spa y casino.",
  },
];

const Main = () => {
  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 className="title">Destinos más populares</h3>
      </div>

      <div className="secContent grid">
        {Data.map(
          ({ id, imgSrc, destTitle, location, grade, fees, description }) => {
            return (
              <div key={id} className="singleDestination">
                <div className="imageDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>
                  <span className="continent flex">
                    <HiOutlineLocationMarker className="icon" />
                    <span className="name">{location}</span>
                  </span>

                  <div className="fees flex">
                    <div className="grade">
                      <span>
                        {grade}
                        <small>+1</small>
                      </span>
                    </div>
                    <div className="price">
                      <h5>{fees}</h5>
                    </div>
                  </div>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className="btn flex">
                    DETALLES <HiOutlineClipboardCheck className="icon" />
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

export default Main;
