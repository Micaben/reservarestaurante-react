export const  Servicios= () => {
  return (
    <div>
    <h1 className="subtitulo" >Nuestros Servicios</h1>
    <section className="services">
      <div className="card">
        <img src="/img/catering.jpg"/>
        <div className="overlay">Catering</div>
      </div>

      <div className="card">
        <img src="/img/buffet.jpg"/>
        <div className="overlay">Buffet con reserva</div>
      </div>
    </section>
    </div>
  );
}