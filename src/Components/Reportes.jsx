import { useEffect, useState } from "react";

export const Reportes = () => {

  const [reservas, setReservas] = useState([]);
  const [fecha] = useState(new Date().toLocaleDateString("sv-SE"));
  const exportarPorDia = () => {
    const data = reservas.filter(r => r.fecha === fecha);

    const csv = [
      ["Nombre", "Hora", "Mesa"],
      ...data.map(r => [r.nombre, r.hora, r.mesa])
    ];

    const contenido = csv.map(e => e.join(",")).join("\n");

    const blob = new Blob([contenido], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "reservas-dia.csv";
    a.click();
  };

  const exportarExcel = () => {
    const csv = [
      ["Nombre", "Fecha", "Hora", "Personas", "Mesa"],
      ...reservas.map(r => [
        r.nombre,
        r.fecha,
        r.hora,
        r.personas,
        r.mesa
      ])
    ];

    const contenido = csv.map(e => e.join(",")).join("\n");

    const blob = new Blob([contenido], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "reservas.csv";
    a.click();
  }

  useEffect(() => {
    const data = localStorage.getItem("reservas");
    if (data) setReservas(JSON.parse(data));
  }, []);

  const totalReservas = reservas.length;
  const totalPersonas = reservas.reduce((acc, r) => acc + Number(r.personas), 0);
  const ingresos = totalPersonas * 20; // estimado

  return (
    <div className="admin">
      <h2>Reportes</h2>

      <div className="row text-center">

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>Reservas</h5>
            <h2>{totalReservas}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>Personas</h5>
            <h2>{totalPersonas}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>Ingresos Est.</h5>
            <h2>S/ {ingresos}</h2>
          </div>
        </div>
        {/* EXPORTAR */}
        <div className="reportes">
          <button className="btn-exportar" onClick={exportarExcel}>
            Exportar Todo
          </button>
          <button className="btn-exportar-sec" onClick={exportarPorDia}>
            Exportar Día
          </button>
        </div>
    </div>
    </div>

  );
};