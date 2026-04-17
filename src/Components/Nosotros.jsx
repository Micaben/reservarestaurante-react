export const Nosotros = () => {
  return (
    <div className="admin">
    <div className="container mt-4">

      <h2 className="text-center mb-4">Sobre Nosotros</h2>

      {/* HISTORIA */}
      <div className="card shadow mb-4 nosotros-card">
        <div className="card-body">
          <h4>🍽 Nuestra Historia</h4>
          <p>
            Somos un restaurante comprometido con brindar experiencias gastronómicas
            únicas, combinando tradición y modernidad. Desde nuestros inicios,
            buscamos ofrecer platos de alta calidad preparados con ingredientes frescos
            y un servicio que haga sentir a cada cliente como en casa.
          </p>
        </div>
      </div>

      {/* MISIÓN Y VISIÓN */}
      <div className="row">

        <div className="col-md-6 mb-4">
          <div className="card shadow h-100 nosotros-card">
            <div className="card-body">
              <h4>🎯 Misión</h4>
              <p>
                Ofrecer una experiencia gastronómica de excelencia, brindando
                platos de calidad, atención personalizada y un ambiente acogedor,
                superando las expectativas de nuestros clientes en cada visita.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow h-100 nosotros-card">
            <div className="card-body">
              <h4>🚀 Visión</h4>
              <p>
                Ser reconocidos como uno de los mejores restaurantes a nivel local,
                destacando por nuestra innovación, calidad en el servicio y compromiso
                con la satisfacción del cliente.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* VALORES */}
      <div className="card shadow mb-4 nosotros-card">
        <div className="card-body">
          <h4>💡 Nuestros Valores</h4>

          <ul className="valores-list">
            <li>✔ Calidad en cada plato</li>
            <li>✔ Atención al cliente excepcional</li>
            <li>✔ Trabajo en equipo</li>
            <li>✔ Innovación constante</li>
            <li>✔ Compromiso y responsabilidad</li>
          </ul>
        </div>
      </div>

      {/* EXPERIENCIA */}
      <div className="card shadow nosotros-card">
        <div className="card-body">
          <h4>🌟 Nuestra Experiencia</h4>
          <p>
            Nos enfocamos en crear momentos memorables, desde una cena familiar
            hasta celebraciones especiales. Nuestro equipo trabaja día a día para
            garantizar un servicio eficiente, rápido y de calidad.
          </p>
        </div>
      </div>
</div>
    </div>
  );
};