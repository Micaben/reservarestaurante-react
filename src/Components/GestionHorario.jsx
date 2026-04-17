import { useState, useEffect } from "react";

const generarHoras = () => {
  const horas = [];
  for (let i = 12; i <= 23; i++) {
    const hora = i > 12 ? i - 12 : i;
    horas.push({
      id: i,
      hora: `${hora}:00 PM`,
      habilitada: true
    });
  }

  horas.push({
    id: 24,
    hora: "12:00 AM",
    habilitada: true
  });

  return horas;
};

export const GestionHorario = ({ horarios, setHorarios }) => {

  const [fecha, setFecha] = useState(
    new Date().toLocaleDateString("sv-SE")
  );

  const horariosDelDia = horarios.find(h => h.fecha === fecha);

  const horasDia = horariosDelDia
    ? horariosDelDia.horas
    : generarHoras();

useEffect(() => {
  const existe = horarios.find(h => h.fecha === fecha);

  if (!existe) {
    setHorarios(prev => [
      ...prev,
      {
        fecha,
        horas: generarHoras()
      }
    ]);
  }
}, [fecha, horarios]);

  const toggleEstado = (id) => {
    const index = horarios.findIndex(h => h.fecha === fecha);

    let nuevos = [...horarios];

    if (index === -1) {
      nuevos.push({
        fecha,
        horas: generarHoras().map(h =>
          h.id === id ? { ...h, habilitada: !h.habilitada } : h
        )
      });
    } else {
      nuevos[index].horas = nuevos[index].horas.map(h =>
        h.id === id ? { ...h, habilitada: !h.habilitada } : h
      );
    }

    setHorarios(nuevos);
  };

  return (
    <div className="admin">

      <h2 className="mb-4">Gestión de Horarios</h2>

      <input
        type="date"
        className="form-control mb-3"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <table className="table table-striped table-hover text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {horasDia.map(h => (
            <tr key={h.id}>
              <td>{h.hora}</td>

              <td>
                <span className={`badge ${h.habilitada ? "bg-success" : "bg-secondary"}`}>
                  {h.habilitada ? "Disponible" : "Bloqueado"}
                </span>
              </td>

              <td>
                <button
                  className={`btn btn-sm ${h.habilitada ? "btn-danger" : "btn-success"}`}
                  onClick={() => toggleEstado(h.id)}
                >
                  {h.habilitada ? "Deshabilitar" : "Habilitar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};