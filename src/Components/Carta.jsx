import { useState, useEffect } from "react";

export const Carta = () => {
    const [editandoId, setEditandoId] = useState(null);
    const [nuevoPrecio, setNuevoPrecio] = useState("");
    const [platos, setPlatos] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem("platos");
        if (data) {
            setPlatos(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        const actualizar = () => {
            const data = localStorage.getItem("platos");
            if (data) setPlatos(JSON.parse(data));
        };

        window.addEventListener("storage", actualizar);

        return () => window.removeEventListener("storage", actualizar);
    }, []);

    const cambiarPrecio = (id, nuevoPrecio) => {
        const actualizados = platos.map(p =>
            p.id === id ? { ...p, precio: Number(nuevoPrecio) } : p
        );
        setPlatos(actualizados);
    };
    const guardarPrecio = (id) => {
        const actualizados = platos.map(p =>
            p.id === id ? { ...p, precio: Number(nuevoPrecio) } : p
        );

        setPlatos(actualizados);
        setEditandoId(null);
    };
    const platosVisibles = platos.filter(p => p.visible !== false);
    return (
        <div className="admin">
            <h2>Nuestra Carta</h2>

            <div className="row">
                {platosVisibles.map(plato => (
                    <div className="col-md-4 mb-4" key={plato.id}>
                        <div className="card shadow">

                            <img src={plato.imagen} className="card-img-top" />

                            <div className="card-body">
                                <h5>{plato.nombre}</h5>
                                <p>{plato.ingredientes}</p>
                                {editandoId === plato.id ? (
                                    <>
                                        <input
                                            type="number"
                                            className="form-control mb-2"
                                            value={nuevoPrecio}
                                            onChange={(e) => setNuevoPrecio(e.target.value)}
                                        />

                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() => guardarPrecio(plato.id)}
                                        >
                                            Guardar
                                        </button>

                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => setEditandoId(null)}
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h5 className="mt-2">S/ {plato.precio}</h5>                                        
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};