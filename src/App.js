import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { Navegacion } from "./Components/Navegacion";
import { Inicio } from "./Components/Inicio";
import { Nosotros } from "./Components/Nosotros";
import { Servicios } from "./Components/Servicios";
import { Footer } from "./Components/Footer";
import { Reservas } from "./Components/Reservas";
import { Login } from "./Components/Login";
import { Dashboard } from "./Components/Dashboard";
import "./style.css";

const App = () => {
  
   return (
    <Router>
      <Navegacion></Navegacion>
      <Routes>
        <Route path="/" element={<Inicio></Inicio>} />
        <Route path="/nosotros" element={<Nosotros></Nosotros>} />
        <Route path="/servicios" element={<Servicios></Servicios>} />
        <Route path="/reservas" element={<Reservas></Reservas>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;