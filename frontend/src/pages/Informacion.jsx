import { useState } from "react";
import "../styles/Informacion.css";
import { useNavigate } from "react-router-dom";

function Informacion() {
  const [deseaParticipar, setDeseaParticipar] = useState(null);
  const navigate = useNavigate();

  const handleRespuesta = (valor) => {
    setDeseaParticipar(valor); // Guardamos la respuesta en el estado
    console.log("Valor enviado al backend:", valor); 

    // Hacemos una solicitud al backend para guardar la respuesta en la base de datos
    fetch("http://localhost:5000/api/participacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deseaParticipar: valor, // Debe coincidir con el campo de la base de datos
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta enviada correctamente", data);
        if (valor === "si") {
          navigate("/registro");
        }
      })
      .catch((error) => {
        console.error("Error al enviar la respuesta:", error);
      });
  };

  return (
    <div className="info-container">
      <h2>Información sobre la participación</h2>
      <p>
      Participa en una actividad deportiva llena de adrenalina y competencia. Disfruta de un torneo donde los equipos lucharán por la victoria, demostrando su habilidad, trabajo en equipo y espíritu competitivo. Es una excelente oportunidad para desafiar tus límites, convivir con otros y poner en práctica tu pasión por el fútbol. ¡Prepárate para una experiencia intensa y llena de emoción!
      no seas un aburrido asi que acompañanos 


      </p>
      <div className="botones">
        <button className="btn" onClick={() => handleRespuesta("si")}>Sí</button>
        <button className="btn" onClick={() => handleRespuesta("no")}>No</button>
      </div>

      {/* Mostrar la respuesta seleccionada */}
      {deseaParticipar && <p>Has elegido: {deseaParticipar}</p>}
    </div>
  );
}

export default Informacion;


  