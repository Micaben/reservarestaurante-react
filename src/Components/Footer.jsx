export const Footer= () => {
  return (
     <footer className="footer">

      <div className="footer-container">

        {/* COLUMNA 1 */}
        <div className="footer-col">
          <img src="/img/logo1.png" className="footer-logo"/>

          <p>
            Sabores Peruanos es más que un restaurante,
            es un hogar y lo demostramos en la calidez de nuestra
            atención en cada visita a esta casa.
          </p>

          <div className="socials">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-tiktok"></i>
          </div>
        </div>

        {/* COLUMNA 2 */}
        <div className="footer-col">
          <h4>Mapa del Sitio</h4>
          <ul>
            <li>Inicio</li>
            <li>Nuestra historia</li>
            <li>Nuestra carta</li>
            <li>Casa Miraflores</li>
            <li>Casa La Molina</li>
            <li>Libro de Reclamaciones</li>
          </ul>
        </div>

        {/* COLUMNA 3 */}
        <div className="footer-col">
          <h4>Casa Miraflores</h4>
          <p><i className="bi bi-geo-alt-fill"></i> Av Alfredo Benavides 2392<br/>Miraflores, Lima, Perú</p>
          <p><i className="bi bi-telephone-fill"></i> 01 449 1395</p>
          <p><i className="bi bi-envelope-fill"></i> miraflores@saboresperuanos.pe</p>
          <p><i className="bi bi-phone-fill"></i> +51 949 735 969</p>
        </div>

        {/* COLUMNA 4 */}
        <div className="footer-col">
          <h4>Casa La Molina</h4>
          <p><i className="bi bi-geo-alt-fill"></i> Av Javier Prado Este 6326<br/>La Molina, Lima, Perú</p>
          <p><i className="bi bi-telephone-fill"></i> 01 348 7802</p>
          <p><i className="bi bi-envelope-fill"></i> molina@saboresperuanos.pe</p>
          <p><i className="bi bi-phone-fill"></i> +51 962 221 266</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2020 SABORES PERUANOS | DESARROLLADO POR MI GRUPO
      </div>

    </footer>
  );
}