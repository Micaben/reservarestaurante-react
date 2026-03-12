import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usuario: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sin validaciones
    navigate("/dashboard");
  };

  return (
    <section className="login-container">
      <h2>Login Administrador</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={form.usuario}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Entrar</button>
      </form>
    </section>
  );
};