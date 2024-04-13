import React, { useEffect, useState } from "react";
import "./home.css";
import video from "../../Assets/mainBeach.mp4";
import { GrLocation } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { TbApps } from "react-icons/tb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(150000);

  const handlePriceChange = (e) => {
    setPrice(parseInt(e.target.value)); // Actualiza el valor del rango y del <h3>
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="home">
      <div className="overlay"> </div>
      <video src={video} muted autoPlay loop type="video/mp4"></video>

      <div className="homeContent container">
        <div className="textDiv">
          <span data-aos="fade-up" className="smallText">
            Nuestros Paquetes
          </span>

          <h1 data-aos="fade-up" className="homeTitle">
            Busca tu Nuevo Destino
          </h1>
        </div>

        <div data-aos="fade-up" className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">Buscar destino:</label>
            <div className="input flex">
              <input type="text" placeholder="Introduce el nombre aquí...." />
              <GrLocation className="icon" />
            </div>
          </div>

          <div className="dateInput">
            <label className="label" htmlFor="date">
              Elegir fechas:
            </label>
            <div className="input flex">
              <div className="datePicker">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Fecha de inicio"
                />
              </div>
              <div className="datePicker">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Fecha final"
                />
              </div>
            </div>
          </div>

          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Precio máximo:</label>
              <h3 className="total">₡{price.toLocaleString()}</h3>
              {/* Muestra el valor actual del rango */}
            </div>
            <div className="input flex">
              <input
                type="range"
                max="2500000"
                min="10000"
                value={price}
                onChange={handlePriceChange}
              />
            </div>
          </div>

          <div className="searchOptions flex">
            <FaSearch className="icon" />
            <span>Buscar</span>
          </div>
        </div>

        <div data-aos="fade-up" className="homeFooterIcons flex">
          <div className="rightIcons">
            <FiFacebook className="icon" />
            <AiOutlineInstagram className="icon" />
            <FaTripadvisor className="icon" />
          </div>

          <div className="leftIcons">
            <BsListTask className="icon" />
            <TbApps className="icon" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
