import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { alertaOk } from "../utils/alerts";
import { alertaError } from "../utils/alerts";
import { ReservasForm } from "../Components/ReservasForm";

export const Reservas = ({ mesas, setMesas, horarios   }) => {
    const [mostrarResumen, setMostrarResumen] = useState(false);
    const [mostrarPago] = useState(false);
    // Valores por defecto
    const fechaActual = new Date().toLocaleDateString('sv-SE');
    const cerrarModal = () => {
        setMostrarResumen(false);
        document.body.style.overflow = "auto";
    };

    
    // Reservas = ARRAY
    const [reservas, setReservas] = useState(() => {
        const data = localStorage.getItem("reservas");
        return data ? JSON.parse(data) : [];
    });

    // Formulario con valores iniciales
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

    //validar hora 
    const HoraPasada = (horaStr) => {
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
        if (mostrarResumen || mostrarPago) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [mostrarResumen, mostrarPago]);


    // Guardar reservas
    useEffect(() => {
        localStorage.setItem("reservas", JSON.stringify(reservas));
    }, [reservas]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!form.mesa) {
            alertaError("Debe seleccionar una mesa");
            return;
        }

        if (!form.hora) {
            alertaError("Debe seleccionar una hora");
            return;
        }

        // Validar duplicado (fecha + hora + mesa)
        const existe = reservas.find(r =>
            r.fecha === form.fecha &&
            r.hora === form.hora &&
            r.mesa === form.mesa
        );

        if (existe) {
            alertaError("Ya existe una reserva en ese horario y mesa");
            return;
        }

        setMostrarResumen(true);
    };

    const procesarPago = () => {
        setReservas(prev => [...prev, form]);

        setMostrarResumen(false);
        document.body.style.overflow = "auto";

        alertaOk("Reserva confirmada");

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

    const horasOcupadas = reservas
        .filter(r =>
            r.fecha === form.fecha &&
            Number(r.mesa) === Number(form.mesa)
        )
        .map(r => r.hora);

    return (
        <section className="reservas-container">

            <h1>Gestión de Reservas</h1>
            {/* FORMULARIO */}
            <ReservasForm
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                seleccionarMesa={seleccionarMesa}
                seleccionarHora={seleccionarHora}
                mesas={mesasConEstado}
                mesasOcupadas={mesasOcupadas}
                horasOcupadas={horasOcupadas}
                fechaActual={fechaActual}
                HoraPasada={HoraPasada}
                horarios={horarios}
            />
            {
                mostrarResumen && createPortal(
                    <div className="modal-overlay">
                        <div className="custom-modal">

                            <h3 className="text-center mb-4">Confirmar Reserva</h3>
                            <p>Políticas de cancelación   S/ 50.00</p>
                            <p>Su reserva exige una garantía. Esta consiste en una pre
                                aprobación de crédito y no ejecuta ningún pago en el momento
                                de realizarse. El monto de la garantía será ejecutado en
                                caso que no honre su reserva (es decir, de que no asista a la
                                misma) o que no logre cancelar la reserva con al menos 24 horas de anticipación.</p>
                            <div className="row modal-content-grid">
                                {/* RESUMEN / TICKET */}
                                <div className="col-md-12 ticket">
                                    <h5 className="mb-3">Resumen</h5>
                                    <p>
                                        <i className="bi bi-person-fill icon"></i>
                                        <strong>Nombre:</strong> {form.nombre}
                                    </p>

                                    <p>
                                        <i className="bi bi-telephone-fill icon"></i>
                                        <strong>Teléfono:</strong> {form.telefono}
                                    </p>

                                    <p>
                                        <i className="bi bi-envelope-fill icon"></i>
                                        <strong>Correo:</strong> {form.correo}
                                    </p>

                                    <hr />

                                    <p>
                                        <i className="bi bi-calendar-event icon"></i>
                                        <strong>Fecha:</strong> {form.fecha}
                                    </p>

                                    <p>
                                        <i className="bi bi-clock-fill icon"></i>
                                        <strong>Hora:</strong> {form.hora}
                                    </p>

                                    <p>
                                        <i className="bi bi-table icon"></i>
                                        <strong>Mesa:</strong> {form.mesa}
                                    </p>

                                    <p>
                                        <i className="bi bi-people-fill icon"></i>
                                        <strong>Personas:</strong> {form.personas}
                                    </p>

                                </div>

                                {/* FORMULARIO DE PAGO */}
                                <div className="col-md-7 pago-form">
                                    <h5 className="mb-3">Datos de Pago</h5>
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Número de tarjeta"
                                    />
                                    <div className="row">
                                        <div className="col">
                                            <input
                                                className="form-control mb-3"
                                                placeholder="MM/AA"
                                            />
                                        </div>

                                        <div className="col">
                                            <input
                                                className="form-control mb-3"
                                                placeholder="CVV"
                                            />
                                        </div>
                                    </div>
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Nombre en la tarjeta"
                                    />
                                </div>
                                <div className="modal-buttons">
                                    <button
                                        className="modal-btn cancel"
                                        onClick={cerrarModal}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        className="modal-btn"
                                        onClick={procesarPago}
                                    >
                                        Proceder al pago
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>, document.body
                )
            }
        </section>
    );
};