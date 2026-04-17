import { useState, useEffect } from "react";

export const ReservasForm = ({
  form,
  handleChange,
  handleSubmit,
  seleccionarMesa,
  seleccionarHora,
  mesas,
  mesasOcupadas,
  horasOcupadas,
  horarios,
  fechaActual,
  HoraPasada,
  esModal = false,
  onCancelar
}) => {

  const horariosDelDia = horarios.find(h => h.fecha === form.fecha);
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
  const horasDisponibles = horariosDelDia
    ? horariosDelDia.horas
    : generarHoras();

  return (
    <form className="reserva-form" onSubmit={handleSubmit}>

      <div className="row">
        <div className="col-lg-6 mb-3">
          <label>Nombres</label>
          <input className="form-control" name="nombre"
            value={form.nombre} onChange={handleChange} required />
        </div>

        <div className="col-lg-6 mb-3">
          <label>Apellidos</label>
          <input className="form-control" name="apellidos"
            value={form.apellidos} onChange={handleChange} required />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-3">
          <label>Correo</label>
          <input className="form-control" type="email" name="correo"
            value={form.correo} onChange={handleChange} required />
        </div>

        <div className="col-lg-6 mb-3">
          <label>Teléfono</label>
          <input className="form-control" name="telefono"
            value={form.telefono} onChange={handleChange} required />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-3">
          <label>Fecha</label>
          <input className="form-control" type="date" name="fecha"
            value={form.fecha} min={fechaActual}
            onChange={handleChange} required />
        </div>

        <div className="col-lg-6 mb-3">
          <label>Personas</label>
          <input className="form-control" type="number" name="personas"
            value={form.personas} min="1"
            onChange={handleChange} required />
        </div>
      </div>

      {/* MESAS */}
      <h4>Seleccionar Mesa</h4>
      <div className="mesas-grid">
        {mesas.map(mesa => {
          const deshabilitada = !mesa.habilitada;
          const ocupada = mesasOcupadas.includes(mesa.id);

          return (
            <div
              key={mesa.id}
              className={`mesa 
          ${ocupada ? "ocupada" : ""} 
          ${deshabilitada ? "deshabilitada" : ""} 
          ${form.mesa === mesa.id ? "selected" : ""}`}
              onClick={() => {
                if (!ocupada && !deshabilitada) {
                  seleccionarMesa(mesa.id);
                }
              }}
            >
              <strong>{mesa.nombre}</strong>
              <p>{mesa.capacidad} personas</p>
            </div>
          );
        })}
      </div>

      {/* HORAS */}
      <h4>Seleccionar Hora</h4>
      <div className="horas-grid">

        {!form.mesa && <p>Selecciona una mesa</p>}

        {horasDisponibles.map(h => {
          const ocupada = horasOcupadas.includes(h.hora);
          const pasada = HoraPasada(h.hora);
          const deshabilitada =
            !form.mesa ||
            ocupada ||
            pasada ||
            !h.habilitada;

          return (
            <div
              key={h.id}
              className={`hora 
          ${ocupada ? "ocupada" : ""} 
          ${form.hora === h.hora ? "selected" : ""} 
          ${deshabilitada ? "disabled" : ""}`}
              onClick={() => {
                if (!deshabilitada) seleccionarHora(h.hora);
              }}
            >
              {h.hora}
            </div>
          );
        })}
      </div>

      <div className="d-flex gap-2 mt-3">
        {/* BOTÓN GUARDAR */}
        <button type="submit" className="btn btn-danger">
          Guardar Reserva
        </button>

        {/* BOTÓN CANCELAR SOLO EN MODAL */}
        {esModal && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        )}

      </div>

    </form>
  );
};