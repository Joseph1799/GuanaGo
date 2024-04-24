import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
import GoogleTranslateWidget from "../Translation/GoogleTranslateWidget";


import "react-datepicker/dist/react-datepicker.css";

import Aos from "aos";
import "aos/dist/aos.css";




const Home = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(150000);
  const [location, setLocation] = useState('');

  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  const handlePriceChange = (e) => {
    setPrice(parseInt(e.target.value)); // Actualiza el valor del rango y del <h3>
  };

  useEffect(() => {
    // Verifica si el widget ya está definido para evitar re-cargas
    if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) {
      var googleTranslateScript = document.createElement('script');
      googleTranslateScript.type = 'text/javascript';
      googleTranslateScript.async = true;
      googleTranslateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(googleTranslateScript);
    }
  }, []);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleSearch = async () => {
    if (startDate && endDate) {
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];

      localStorage.setItem('startDate', formattedStartDate);
      localStorage.setItem('endDate', formattedEndDate);

      try {
        const response = await fetch(`http://localhost:8080/guanago/destinos/buscar-destino?lugar=${location}&inicio=${formattedStartDate}&fin=${formattedEndDate}&precio=${price}00`);
        console.log(`http://localhost:8080/guanago/destinos/buscar-destino?lugar=${location}&inicio=${formattedStartDate}&fin=${formattedEndDate}&precio=${price}00`)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        navigate('/destinos', { state: { data, location, startDate: formattedStartDate, endDate: formattedEndDate, price } });
      } catch (error) {
        console.error('There was an error!', error);
      }
    }

  };

  return (
    
    <section className="home">
      <div className="overlay"> </div>
      <video src={video} muted autoPlay loop type="video/mp4"></video>
      <GoogleTranslateWidget />
     <div id="google_translate_element"></div>
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
              <input
                type="text"
                placeholder="Introduce el nombre aquí...."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
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

          <div className="searchOptions flex" onClick={handleSearch}>
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
