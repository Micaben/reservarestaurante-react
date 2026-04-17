import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
export const Navegacion = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("auth") === "true"
  );

  const [usuario, setUsuario] = useState(
    localStorage.getItem("usuario") || ""
  );

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("usuario");

    setIsAuth(false);

    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(localStorage.getItem("auth") === "true");
      setUsuario(localStorage.getItem("usuario") || "");
    };

    window.addEventListener("authChange", checkAuth);

    return () => window.removeEventListener("authChange", checkAuth);
  }, []);

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
              <img src="/img/logo.png" alt="logo" />
            </Link>
          </div>

          {/* BOTON HAMBURGUESA */}
          <div
            className="hamburger"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <i className="bi bi-list"></i>
          </div>

          <nav>
            <ul className={`menu ${menuAbierto ? "menu-open" : ""}`}>
              {!isAuth ? (
                <>
                  <li>
                    <Link to="/carta" className="reserva-link" >NUESTRA CARTA</Link>
                  </li>
                  <li>
                    <Link to="/sedes" className="reserva-link" >NUESTRA CASAS</Link>
                  </li>
                  
                  <li>
                    <Link to="/nosotros" className="reserva-link" >NUESTRA HISTORIA</Link>
                  </li>

                  <li className="reserva">
                    <Link to="/reservas" className="reserva-link" onClick={() => setMenuAbierto(false)}>
                      RESERVACIONES
                    </Link>
                  </li>

                  <li className="reserva">
                    <Link to="/login" className="reserva-link" onClick={() => setMenuAbierto(false)}>
                      LOGIN
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/gestionmesas" className="reserva-link" >GESTIÓN DE MESAS</Link>
                  </li>
                  <li>
                    <Link to="/gestionhorario" className="reserva-link" >GESTIÓN DE HORARIOS</Link>
                  </li>
                  <li>
                    <Link to="/gestionmenu" className="reserva-link" >GESTION MENU</Link>
                  </li>
                  <li>
                    <Link to="/calendario" className="reserva-link" >RESERVACIONES</Link>
                  </li>
                  <li>
                    <Link to="/reportes" className="reserva-link" >REPORTES</Link>
                  </li>
                  <li style={{ color: "white", fontWeight: "bold" }}>
                    {usuario}
                  </li>
                  <li >
                    <button 
                      className="btn btn-danger"
                      onClick={handleLogout}
                    >
                      CERRAR SESIÓN
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>

        </div>
      </header>
    </>
  )
}