import React from 'react'
import { useState, useEffect } from "react";
import { Servicios } from "./Servicios";

const imagenes = [
  "/img/imagenfondo.jpg",
  "/img/imagenfondo1.jpg",
  "/img/imagenfondo3.jpg"
];

export const Inicio = () => {
  
  const [index, setIndex] = useState(0);
  useEffect(() => {    
    const intervalo = setInterval(() => {
      setIndex(prev => (prev + 1) % imagenes.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
    <section className="hero">
      {imagenes.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`hero-img ${i === index ? "active" : ""}`}
        />
      ))}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Great+Vibes&display=swap" rel="stylesheet"></link>
      <div className="hero-overlay">

        {/* TEXTO */}
        <div className="hero-text">
          <h1 className="titulo">Estamos</h1>
          <h2 className="subtitulo">de vuelta</h2>

          <div className="horario">
            <h4>Nuestro horario de atención</h4>
            <p>Lunes - Sábado: 09:00am - 11:00pm</p>
            <p>Domingos - Feriados: 09:00am - 06:00pm</p>
          </div>
        </div>
      </div>
      
    </section>
     <Servicios />
    </>
  )
}
