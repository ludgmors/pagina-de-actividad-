import { useState } from "react";
import "../styles/Registro.css";

function Registro() {
  const [formData, setFormData] = useState({
    nombreEquipo: "",
    semestre: "",
    carrera: "",
    genero: "",
    nombre: "",
    apellido: "",
    carnet: "",
    seccion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar carnet (debe ser en formato 1590-21-1858)
    const carnetRegex = /^\d{4}-\d{2}-\d{4,6}$/;
    if (!carnetRegex.test(formData.carnet)) {
      alert("El carnet debe estar en el formato: 1590-21-1858");
      return;
    }

    // Validar sección (solo letras)
    const seccionRegex = /^[a-zA-Z]$/;
    if (!seccionRegex.test(formData.seccion)) {
      alert("La sección debe ser una sola letra (a, b, c, etc.)");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.mensaje);
      setFormData({
        nombreEquipo: "",
        semestre: "",
        carrera: "",
        genero: "",
        nombre: "",
        apellido: "",
        carnet: "",
        seccion: "",
      });
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <div className="registro-container">
      <h2>Registro para Participar</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre del Equipo:</label>
        <input
          type="text"
          name="nombreEquipo"
          value={formData.nombreEquipo}
          onChange={handleChange}
          required
        />

        <label>Semestre:</label>
        <input
          type="text"
          name="semestre"
          value={formData.semestre}
          onChange={handleChange}
          required
        />

        <label>Carrera:</label>
        <input
          type="text"
          name="carrera"
          value={formData.carrera}
          onChange={handleChange}
          required
        />

        <label>Género:</label>
        <select
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>

        </select>

        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />

        <label>Carnet:</label>
        <input
          type="text"
          name="carnet"
          value={formData.carnet}
          onChange={handleChange}
          required
        />

        <label>Sección:</label>
        <input
          type="text"
          name="seccion"
          value={formData.seccion}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Registro;


  