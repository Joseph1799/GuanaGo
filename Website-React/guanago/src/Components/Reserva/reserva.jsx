import React from 'react';
import "./reserva.css";
import { useLocation } from 'react-router-dom';

const Data = [

];

const Reserva = () => {

    const location = useLocation();
    const data = location.state ? location.state.data : [];
    

    return (
        <section className="main container section">
    
    </section>
  );
};

export default Reserva;
