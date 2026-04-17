import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Navegacion } from "./Components/Navegacion";
import { Inicio } from "./Components/Inicio";
import { Nosotros } from "./Components/Nosotros";
import { Sedes } from "./Components/Sedes";
import { Servicios } from "./Components/Servicios";
import { Footer } from "./Components/Footer";
import { Reservas } from "./Components/Reservas";
import { Login } from "./Components/Login";
import { Dashboard } from "./Components/Dashboard";
import { Calendario } from "./Components/Calendario";
import { GestionMesas } from "./Components/GestionMesas";
import { GestionHorario } from "./Components/GestionHorario";
import { GestionMenu } from "./Components/GestionMenu";
import { Reportes } from "./Components/Reportes";
import { Carta } from "./Components/Carta";
import "./style.css";

const mesasIniciales = [
  { id: 1, nombre: "Mesa 1", capacidad: 4, habilitada: true },
  { id: 2, nombre: "Mesa 2", capacidad: 2, habilitada: true },
  { id: 3, nombre: "Mesa 3", capacidad: 6, habilitada: true },
  { id: 4, nombre: "Mesa 4", capacidad: 4, habilitada: true },
  { id: 5, nombre: "Mesa 5", capacidad: 8, habilitada: true },
  { id: 6, nombre: "Mesa 6", capacidad: 6, habilitada: true }
];

const horariosIniciales = [
  { id: 12, hora: "12:00 PM", habilitada: true },
  { id: 13, hora: "1:00 PM", habilitada: true },
  { id: 14, hora: "2:00 PM", habilitada: true },
  { id: 15, hora: "3:00 PM", habilitada: true },
  { id: 16, hora: "4:00 PM", habilitada: true },
  { id: 17, hora: "5:00 PM", habilitada: true },
  { id: 18, hora: "6:00 PM", habilitada: true },
  { id: 19, hora: "7:00 PM", habilitada: true },
  { id: 20, hora: "8:00 PM", habilitada: true },
  { id: 21, hora: "9:00 PM", habilitada: true },
  { id: 22, hora: "10:00 PM", habilitada: true },
  { id: 23, hora: "11:00 PM", habilitada: true }
];

const App = () => {
  const [mesas, setMesas] = useState(() => {
    const data = localStorage.getItem("mesas");

    if (data) {
      const parsed = JSON.parse(data);

      return parsed.map((m, index) => ({
        id: m.id || index + 1,
        nombre: m.nombre || `Mesa ${index + 1}`,
        capacidad: m.capacidad || 1,
        habilitada: m.habilitada ?? true
      }));
    }

    return mesasIniciales;
  });

  const [horarios, setHorarios] = useState(() => {
    const data = localStorage.getItem("horarios");

    if (data) return JSON.parse(data);

    return []; // vacío real
  });

  useEffect(() => {
    localStorage.setItem("horarios", JSON.stringify(horarios));
  }, [horarios]);

  return (
    <Router>
      <Navegacion></Navegacion>
      <Routes>
        <Route path="/" element={<Inicio></Inicio>} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/sedes" element={<Sedes />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/reservas" element={<Reservas mesas={mesas} setMesas={setMesas} horarios={horarios} setHorarios={setHorarios} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard mesas={mesas} />} />
        <Route path="/calendario" element={<Calendario mesas={mesas} setMesas={setMesas} horarios={horarios} setHorarios={setHorarios} />} />
        <Route path="/gestionMesas" element={<GestionMesas mesas={mesas} setMesas={setMesas} horarios={horarios} setHorarios={setHorarios} />} />
        <Route path="/gestionHorario" element={<GestionHorario mesas={mesas} setMesas={setMesas} horarios={horarios}  setHorarios={setHorarios}  />}/>
        <Route path="/gestionMenu" element={<GestionMenu mesas={mesas} setMesas={setMesas} horarios={horarios} setHorarios={setHorarios} />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;