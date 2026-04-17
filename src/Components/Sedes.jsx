import { useState } from "react";

const sedesIniciales = [
  {
    id: 1,
    nombre: "Sede Miraflores",
    direccion: "Av. Larco 123, Miraflores",
    telefono: "987 654 321",
    horario: "12:00 PM - 11:00 PM",
    imagen: "/img/sede1.jpg"
  },
  {
    id: 2,
    nombre: "Sede San Isidro",
    direccion: "Av. Javier Prado 456, San Isidro",
    telefono: "912 345 678",
    horario: "12:00 PM - 10:00 PM",
    imagen: "/img/sede2.jpg"
  },
  {
    id: 3,
    nombre: "Sede Surco",
    direccion: "Av. Caminos del Inca 789, Surco",
    telefono: "999 888 777",
    horario: "1:00 PM - 11:30 PM",
    imagen: "/img/sede3.jpg"
  }
];

export const Sedes = () => {
  const [sedes] = useState(sedesIniciales);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Nuestras Sedes</h2>

      <div className="row">
        {sedes.map(sede => (
          <div className="col-md-4 mb-4" key={sede.id}>
            <div className="card shadow h-100 sede-card">

              <img
                src={sede.imagen}
                className="card-img-top"
                alt={sede.nombre}
              />

              <div className="card-body">
                <h5 className="card-title">{sede.nombre}</h5>

                <p className="card-text">
                  📍 <strong>Dirección:</strong><br />
                  {sede.direccion}
                </p>

                <p className="card-text">
                  📞 <strong>Teléfono:</strong><br />
                  {sede.telefono}
                </p>

                <p className="card-text">
                  🕒 <strong>Horario:</strong><br />
                  {sede.horario}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};