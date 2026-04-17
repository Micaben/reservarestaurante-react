import { useState, useEffect } from "react";
import { ReservasForm } from "../Components/ReservasForm";
import { alertaOk } from "../utils/alerts";

export const Calendario = ({ mesas, setMesas, horarios }) => {
    const [reservas, setReservas] = useState([]);
    const [mesActual, setMesActual] = useState(new Date());
    const [mostrarModal, setMostrarModal] = useState(false);
    const [fecha, setFecha] = useState(new Date().toLocaleDateString("sv-SE"));
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const minutosActual = ahora.getMinutes();
    const [mostrarModalReserva, setMostrarModalReserva] = useState(false);
    const [reservaEditando, setReservaEditando] = useState(null);
    const [formEdit, setFormEdit] = useState({
        hora: "",
        mesa: "",
        personas: ""
    });
    const fechaActual = new Date().toLocaleDateString("sv-SE");
    const [form, setForm] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        correo: "",
        fecha: fechaActual,
        hora: "",
        personas: 1,
        mesa: ""
    });
    const reservasDelDia = reservas.filter(r => r.fecha === fecha);

    const cambiarMes = (dir) => {
        const nuevo = new Date(mesActual);
        nuevo.setMonth(nuevo.getMonth() + dir);
        setMesActual(nuevo);
    }
    const mesasOcupadas = reservas
        .filter(r => r.fecha === form.fecha && r.hora === form.hora)
        .map(r => Number(r.mesa));

    const mesasConEstado = mesas.map(mesa => {
        const ocupada = mesasOcupadas.includes(mesa.id);

        return {
            ...mesa,
            ocupada,
            disponible: mesa.habilitada && !ocupada
        };
    });

    const estadisticas = {
        total: reservas.length,
        hoy: reservasDelDia.length,
        personas: reservas.reduce((a, b) => a + Number(b.personas || 0), 0)
    }

    const cerrarModal = () => {
        setMostrarModal(false);
        document.body.style.overflow = "auto";
    };

    const HoraPasada = (horaStr) => {
        if (!horaStr || typeof horaStr !== "string") return false;

        const ahora = new Date();

        let [hora, minuto] = horaStr.split(" ")[0].split(":");
        let periodo = horaStr.split(" ")[1];

        hora = parseInt(hora);

        if (periodo === "PM" && hora !== 12) hora += 12;
        if (periodo === "AM" && hora === 12) hora = 0;

        const fechaHora = new Date();
        fechaHora.setHours(hora, parseInt(minuto), 0);

        return fechaHora < ahora;
    };

    useEffect(() => {
        localStorage.setItem("mesas", JSON.stringify(mesas));
    }, [mesas]);

    useEffect(() => {
        const data = localStorage.getItem("reservas");
        if (data) setReservas(JSON.parse(data));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const seleccionarHora = hora => {
        setForm({ ...form, hora });
    }

    const seleccionarMesa = mesa => {
        setForm({
            ...form,
            mesa,
            hora: ""
        });
    }

    const guardarReservas = (data) => {
        setReservas(data);
        localStorage.setItem("reservas", JSON.stringify(data));
    }

    const horasOcupadasEdicion = reservas
        .filter(r =>
            r.fecha === fecha &&
            Number(r.mesa) === Number(formEdit.mesa)
        )
        .map(r => r.hora);

    const horarioDelDia = horarios.find(h => h.fecha === fecha);
        
    const horasDisponibles = horarioDelDia
        ? horarioDelDia.horas
        : [];

    const validar = () => {
        const nuevosErrores = {};

        if (!form.mesa) {
            nuevosErrores.mesa = "Seleccione una mesa";
        }

        if (!form.hora) {
            nuevosErrores.hora = "Seleccione una hora";
        }

        return Object.keys(nuevosErrores).length === 0;
    };

    const guardarReservaAdmin = (e) => {
        e.preventDefault();

        if (!validar()) return;
        guardarReservas([...reservas, form]);
        alertaOk("Reserva confirmada");
        setMostrarModal(false);

        setForm({
            nombre: "",
            apellidos: "",
            telefono: "",
            correo: "",
            fecha: fechaActual,
            hora: "",
            personas: 1,
            mesa: ""
        });
    };

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

    const iniciarEdicion = (reserva, index) => {
        setReservaEditando(index);
        setFormEdit({
            hora: reserva.hora || "",
            mesa: reserva.mesa || "",
            personas: reserva.personas || 1
        });
        setMostrarModalReserva(true);
    };

    const eliminarReserva = (index) => {
        const nuevas = reservas.filter((_, i) => i !== index);
        guardarReservas(nuevas);
    }

    const guardarEdicion = () => {
        const nuevas = [...reservas];

        nuevas[reservaEditando] = {
            ...nuevas[reservaEditando],
            hora: formEdit.hora,
            mesa: formEdit.mesa,
            personas: formEdit.personas
        };

        setReservas(nuevas);
        localStorage.setItem("reservas", JSON.stringify(nuevas));

        setMostrarModalReserva(false);
    };

    return (
        <div className="admin">
            <h2>Reservaciones</h2>

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
                        <div key={dia} onClick={() => setFecha(dia)}
                            className={`dia ${dia === fecha ? "activo" : ""}`} >
                            {dia.split("-")[2]}
                            {tieneReserva && <span className="dot"></span>}
                        </div>
                    )
                })}
            </div>
            {/* LISTA RESERVAS */}

            {reservasDelDia.map((r, i) => (
                <div key={i} className="reserva-item">

                    <div className="reserva-info">
                        <strong>{r.nombre} {r.apellidos}</strong>
                        <div>Hora ⏰ : {r.hora}</div>
                        <div>Mesa 🍽 : {r.mesa}</div>
                        <div>Personas 👥 : {r.personas}</div>
                    </div>

                    <div className="reserva-actions">
                        <button
                            className="btn-edit"
                            onClick={() => iniciarEdicion(r, i)}
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
            <div className="reportes">
                <button className="btn-exportar" onClick={() => setMostrarModal(true)}>
                    + Nueva Reserva
                </button>
            </div>

            {mostrarModal && (
                <div className="modal-overlay">
                    <div className="custom-modal">

                        <h3>Nueva Reserva</h3>

                        <ReservasForm
                            form={form}
                            handleChange={handleChange}
                            handleSubmit={guardarReservaAdmin}
                            seleccionarMesa={seleccionarMesa}
                            seleccionarHora={seleccionarHora}
                            mesas={mesasConEstado}
                            mesasOcupadas={mesasOcupadas}
                            horasOcupadas={horasOcupadasEdicion}
                            horarios={horarios}
                            fechaActual={fechaActual}
                            HoraPasada={HoraPasada}
                            esModal={true}
                            onCancelar={cerrarModal}
                        />

                    </div>
                </div>
            )}
            {mostrarModalReserva && (
                <div className="modal-overlay1">
                    <div className="custom-modal1">

                        <h3>Editar Reserva</h3>

                        <div className="mb-3">
                            <label>Hora</label>
                            <select
                                className="form-select"
                                value={formEdit.hora}
                                onChange={(e) =>
                                    setFormEdit({ ...formEdit, hora: e.target.value })
                                }
                            >
                                <option value="">Seleccionar hora</option>

                                {horasDisponibles.map(h => {
                                    const ocupada = horasOcupadasEdicion.includes(h.hora);
                                    const pasada = HoraPasada(h.hora);

                                    const disabled = ocupada || pasada || !h.habilitada;

                                    return (
                                        <option
                                            key={h.id}
                                            value={h.hora}
                                            disabled={disabled}
                                        >
                                            {h.hora}
                                            {ocupada ? " (Ocupada)" : ""}
                                            {pasada ? " (No disponible)" : ""}
                                            {!h.habilitada ? " (No disponible)" : ""}
                                        </option>
                                    );
                                })}
                            </select>

                        </div>

                        <div className="mb-3">
                            <label>Mesa</label>
                            <input
                                className="form-control"
                                value={formEdit.mesa}
                                onChange={(e) =>
                                    setFormEdit({ ...formEdit, mesa: e.target.value })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label>Personas</label>
                            <input
                                className="form-control"
                                value={formEdit.personas}
                                onChange={(e) =>
                                    setFormEdit({ ...formEdit, personas: e.target.value })
                                }
                            />
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-success" onClick={guardarEdicion}>
                                Guardar
                            </button>

                            <button
                                className="btn btn-secondary"
                                onClick={() => setMostrarModalReserva(false)}
                            >
                                Cancelar
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );

};