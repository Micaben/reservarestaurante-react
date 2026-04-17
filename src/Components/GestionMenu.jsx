import { useState, useEffect } from "react";

export const GestionMenu = () => {

  const [platos, setPlatos] = useState(() => {
    const data = localStorage.getItem("platos");
    return data ? JSON.parse(data) : [];
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    ingredientes: "",
    precio: "",
    imagen: "",
    visible: true
  });

  useEffect(() => {
    localStorage.setItem("platos", JSON.stringify(platos));
  }, [platos]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 abrir modal (nuevo o editar)
  const abrirModal = (plato = null) => {
    if (plato) {
      setEditando(plato.id);
      setForm(plato);
    } else {
      setEditando(null);
      setForm({
        nombre: "",
        ingredientes: "",
        precio: "",
        imagen: "",
        visible: true
      });
    }
    setMostrarModal(true);
  };

  const guardarPlato = () => {
    if (!form.nombre || !form.precio) return;

    if (editando) {
      // editar
      const actualizados = platos.map(p =>
        p.id === editando ? { ...form, id: editando } : p
      );
      setPlatos(actualizados);
    } else {
      // nuevo
      setPlatos([
        ...platos,
        { ...form, id: Date.now() }
      ]);
    }

    setMostrarModal(false);
  };

  const eliminarPlato = (id) => {
    setPlatos(platos.filter(p => p.id !== id));
  };

  const toggleVisible = (id) => {
    const nuevos = platos.map(p =>
      p.id === id ? { ...p, visible: !p.visible } : p
    );
    setPlatos(nuevos);
  };

  return (
    <div className="container mt-4">
      <h2>Gestión del Menú</h2>

      <button className="btn btn-primary mb-3" onClick={() => abrirModal()}>
        ➕ Nuevo Plato
      </button>

      {/* TABLA */}
      <table className="table table-striped table-hover text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {platos.map(p => (
            <tr key={p.id}>
              <td>
                <img
                  src={p.imagen || "/img/default.jpg"}
                  width="60"
                  height="60"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </td>

              <td>{p.nombre}</td>

              <td>S/ {p.precio}</td>

              <td>
                <span className={`badge ${p.visible ? "bg-success" : "bg-secondary"}`}>
                  {p.visible ? "Visible" : "Oculto"}
                </span>
              </td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => abrirModal(p)}
                >
                  Editar
                </button>

                <button
                  className={`btn btn-sm me-2 ${p.visible ? "btn-secondary" : "btn-success"}`}
                  onClick={() => toggleVisible(p.id)}
                >
                  {p.visible ? "Ocultar" : "Mostrar"}
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarPlato(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="custom-modal">

            <h4>{editando ? "Editar Plato" : "Nuevo Plato"}</h4>

            <input
              name="nombre"
              placeholder="Nombre"
              className="form-control mb-2"
              value={form.nombre}
              onChange={handleChange}
            />

            <input
              name="ingredientes"
              placeholder="Ingredientes"
              className="form-control mb-2"
              value={form.ingredientes}
              onChange={handleChange}
            />

            <input
              name="precio"
              type="number"
              placeholder="Precio"
              className="form-control mb-2"
              value={form.precio}
              onChange={handleChange}
            />

            <input
              name="imagen"
              placeholder="URL Imagen"
              className="form-control mb-2"
              value={form.imagen}
              onChange={handleChange}
            />

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={form.visible}
                onChange={() =>
                  setForm({ ...form, visible: !form.visible })
                }
              />
              <label className="form-check-label">
                Mostrar en carta
              </label>
            </div>

            <button className="btn btn-success me-2" onClick={guardarPlato}>
              Guardar
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setMostrarModal(false)}
            >
              Cancelar
            </button>

          </div>
        </div>
      )}
    </div>
  );
};