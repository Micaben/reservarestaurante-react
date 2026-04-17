import { useState, useEffect } from "react";

export const GestionMesas = ({ mesas, setMesas }) => {

    const toggleEstado = (id) => {
        const nuevas = mesas.map(m =>
            m.id === id ? { ...m, habilitada: !m.habilitada } : m
        );
        setMesas(nuevas);
    };

    const cambiarCapacidad = (id, valor) => {
        const nuevas = mesas.map(m =>
            m.id === id ? { ...m, capacidad: Number(valor) } : m
        );
        setMesas(nuevas);
    };
    return (
        <div className="admin">
                <h2 className="mb-4">Gestión de Mesas</h2>

                <table className="table table-striped table-hover text-center align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Mesa</th>
                            <th>Capacidad</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>

                    <tbody>
                        {mesas.map(mesa => (
                            <tr key={mesa.id}>
                                <td>{mesa.nombre}</td>

                                <td style={{ maxWidth: "100px" }}>
                                    <input
                                        type="number"
                                        className="form-control text-center"
                                        value={mesa.capacidad}
                                        min="1"
                                        onChange={(e) =>
                                            cambiarCapacidad(mesa.id, e.target.value)
                                        }
                                    />
                                </td>

                                <td>
                                    <span className={`badge ${mesa.habilitada ? "bg-success" : "bg-secondary"}`}>
                                        {mesa.habilitada ? "Activa" : "Inactiva"}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        className={`btn btn-sm ${mesa.habilitada ? "btn-danger" : "btn-success"
                                            }`}
                                        onClick={() => toggleEstado(mesa.id)}
                                    >
                                        {mesa.habilitada ? "Deshabilitar" : "Habilitar"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}
