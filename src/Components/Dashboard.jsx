import { useEffect, useState } from "react";

export const Dashboard = () => {

  const [mesas, setMesas] = useState([]);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const m = localStorage.getItem("mesas");
    const r = localStorage.getItem("reservas");

    if (m) setMesas(JSON.parse(m));
    if (r) setReservas(JSON.parse(r));
  }, []);

  const activas = mesas.filter(m => m.habilitada).length;
  const inactivas = mesas.length - activas;

  const hoy = new Date().toLocaleDateString("sv-SE");
  const reservasHoy = reservas.filter(r => r.fecha === hoy);

  return (
    <div className="container mt-4">
      <h2>Panel Administrador</h2>

      <div className="row text-center">

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>Mesas Activas</h5>
            <h2>{activas}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>Mesas Inactivas</h5>
            <h2>{inactivas}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>Reservas Hoy</h5>
            <h2>{reservasHoy.length}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>Ocupación</h5>
            <h2>{reservasHoy.length > 0 ? "Alta" : "Baja"}</h2>
          </div>
        </div>

      </div>

      {/* accesos rápidos */}
      <div className="mt-4">
        <h5>Accesos rápidos</h5>

        <button className="btn btn-primary m-2">Gestionar Mesas</button>
        <button className="btn btn-success m-2">Ver Reservas</button>
        <button className="btn btn-warning m-2">Editar Carta</button>
      </div>
    </div>
  );
};