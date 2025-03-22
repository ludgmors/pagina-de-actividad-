import { useState } from "react";
import "../styles/Inicio.css";
import Menu from "../components/Menu";

function Inicio() {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  console.log(mostrarMenu); // Verifica si el estado cambia

  return (
    <div className="inicio">
      {!mostrarMenu ? (
        <>
          <img src="/imagen2.png" alt="Imagen2" className="imagen2" />
          <h1>PARTICIPA EN NUESTRA ACTIVIDAD UMG</h1>
          <button className="btn-start" onClick={() => setMostrarMenu(true)}>
            Participar
          </button>
          <img src="/imagen3.png" alt="Imagen Derecha" className="imagen3" />
        </>
      ) : (
        <Menu />
      )}
    </div>
  );
}

export default Inicio;


  
  