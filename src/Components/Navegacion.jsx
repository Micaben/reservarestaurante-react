import { Link } from 'react-router-dom';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

export const Navegacion = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  return (
    <>
      <div className="topbar">
        <div className="topbar-content">
          <div className="top-left">
            <span> Llámenos hoy al: <i className="bi bi-telephone-fill"></i> (01) 449 1395</span>
            <span><i className="bi bi-envelope-fill"></i> administracion@saboresperuanos.pe</span>
          </div>
          <div className="top-right">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-tiktok"></i>
          </div>
        </div>
      </div>

      <header className="main-navbar">
        <div className="nav-container">

          <div className="logo">
            <Link to="/">
              <img src="/img/logo.png" alt="logo"/>
            </Link>
          </div>

          {/* BOTON HAMBURGUESA */}
          <div 
            className="hamburger"
            onClick={()=>setMenuAbierto(!menuAbierto)}
          >
            <i className="bi bi-list"></i>
          </div>

          <nav>
            <ul className={`menu ${menuAbierto ? "menu-open" : ""}`}>
              <li>NUESTRA CARTA</li>
              <li>NUESTRAS CASAS</li>
              <li>GALERÍA</li>
              <li>NUESTRA HISTORIA</li>

              <li className="reserva">
                <Link to="/reservas" className="reserva-link" onClick={()=>setMenuAbierto(false)}>RESERVACIONES</Link>
              </li>

              <li className="reserva">
                <Link to="/login" className="reserva-link" onClick={()=>setMenuAbierto(false)}>LOGIN</Link>
              </li>
            </ul>
          </nav>

        </div>
      </header>
    </>
  )
}