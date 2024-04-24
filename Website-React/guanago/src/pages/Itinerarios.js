import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ItinerarioComp from "../Components/Itinerario/ItinerarioComp";


const Itinerarios = () => {
  return (
    <>
      <Navbar />
      <ItinerarioComp />
      <Footer/>
    </>
  );
};

export default Itinerarios;
