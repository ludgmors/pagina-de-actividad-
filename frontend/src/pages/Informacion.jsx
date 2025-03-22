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
        Aquí va la información sobre el evento o actividad. Por favor, elige si deseas participar.
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


  