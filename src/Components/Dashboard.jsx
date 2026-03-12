import { useEffect, useState } from "react";

const MESAS = [
  { id: 1, capacidad: 2 },
  { id: 2, capacidad: 4 },
  { id: 3, capacidad: 4 },
  { id: 4, capacidad: 6 },
  { id: 5, capacidad: 8 },
  { id: 6, capacidad: 2 },
  { id: 7, capacidad: 4 },
  { id: 8, capacidad: 6 }
];

export const Dashboard = () => {

  const [reservas, setReservas] = useState([]);
  const [fecha, setFecha] = useState(new Date().toLocaleDateString("sv-SE"));
  const [horaFiltro, setHoraFiltro] = useState("");
  const [mesActual, setMesActual] = useState(new Date());

  useEffect(() => {
    const data = localStorage.getItem("reservas");
    if (data) setReservas(JSON.parse(data));
  }, []);

  const guardarReservas = (data) => {
    setReservas(data);
    localStorage.setItem("reservas", JSON.stringify(data));
  }

  const reservasDelDia = reservas.filter(r => r.fecha === fecha);

  const eliminarReserva = (index) => {
    const nuevas = reservas.filter((_, i) => i !== index);
    guardarReservas(nuevas);
  }

  const editarReserva = (index) => {

    const nuevaHora = prompt("Nueva hora", reservas[index].hora);
    if (!nuevaHora) return;

    const nuevaMesa = prompt("Nueva mesa", reservas[index].mesa);
    if (!nuevaMesa) return;

    const nuevas = [...reservas];

    nuevas[index].hora = nuevaHora;
    nuevas[index].mesa = nuevaMesa;

    guardarReservas(nuevas);
  }

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

  const cambiarMes = (dir) => {
    const nuevo = new Date(mesActual);
    nuevo.setMonth(nuevo.getMonth() + dir);
    setMesActual(nuevo);
  }

  const generarCalendario = () => {

    const year = mesActual.getFullYear();
    const month = mesActual.getMonth();

    const primerDia = new Date(year, month, 1).getDay();
    const ultimoDia = new Date(year, month + 1, 0).getDate();
    const dias = [];

    // Ajustar para que lunes sea primer día
    const inicio = primerDia === 0 ? 6 : primerDia - 1;

    // Espacios vacíos antes del día 1
    for (let i = 0; i < inicio; i++) {
      dias.push(null);
    }

    // Días del mes
    for (let i = 1; i <= ultimoDia; i++) {
      const fecha = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      dias.push(fecha);
    }

    return dias;
  };

  const estadisticas = {
    total: reservas.length,
    hoy: reservasDelDia.length,
    personas: reservas.reduce((a, b) => a + Number(b.personas || 0), 0)
  }

  return (
    <div className="admin">

      <h1>Panel de Administración</h1>

      {/* RESUMEN */}
      <div className="stats">
        <div className="stat-card total">
          <span>Total Reservas</span>
          <h2>{estadisticas.total}</h2>
        </div>

        <div className="stat-card hoy">
          <span>Reservas Hoy</span>
          <h2>{estadisticas.hoy}</h2>
        </div>

        <div className="stat-card personas">
          <span>Total Personas</span>
          <h2>{estadisticas.personas}</h2>
        </div>
      </div>


      <div className="calendar-header">
        <button onClick={() => cambiarMes(-1)}>◀</button>
        <span>
          {mesActual.toLocaleString("es", { month: "long" })} {mesActual.getFullYear()}
        </span>
        <button onClick={() => cambiarMes(1)}>▶</button>
      </div>
      <div className="dias-semana">
        <div>Lun</div>
        <div>Mar</div>
        <div>Mié</div>
        <div>Jue</div>
        <div>Vie</div>
        <div>Sáb</div>
        <div>Dom</div>
      </div>
      <div className="calendar-grid">
        {generarCalendario().map((dia, index) => {

          if (!dia) {
            return <div key={index} className="dia-vacio"></div>;
          }

          const tieneReserva = reservas.some(r => r.fecha === dia);

          return (
            <div
              key={dia}
              onClick={() => setFecha(dia)}
              className={`dia ${dia === fecha ? "activo" : ""}`}
            >
              {dia.split("-")[2]}

              {tieneReserva && <span className="dot"></span>}
            </div>
          )
        })}
      </div>

      {/* LISTA RESERVAS */}
      <h2>Reservas del día</h2>

      {reservasDelDia
        .filter(r => horaFiltro ? r.hora === horaFiltro : true)
        .map((r, i) => (
          <div key={i} className="reserva-item">

            <div className="reserva-info">
              <strong>{r.nombre +" "+ r.apellidos}</strong>
              <div>⏰ {r.hora}</div>
              <div>🍽  Mesa {r.mesa}</div>
              <div>👥 {r.personas} personas</div>              
            </div>

            <div className="reserva-actions">
              <button
                className="btn-edit"
                onClick={() => editarReserva(i)}
              >
                Editar
              </button>

              <button
                className="btn-delete"
                onClick={() => eliminarReserva(i)}
              >
                Eliminar
              </button>
            </div>

          </div>
        ))}

      {/* EXPORTAR */}
      <button className="btn-exportar" onClick={exportarExcel}>
        Exportar a Excel
      </button>
    </div>
  )
}