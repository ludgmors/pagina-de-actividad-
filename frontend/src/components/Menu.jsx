import { Link } from "react-router-dom";
import "../styles/Menu.css";  // Asegúrate de importar el CSS

function Menu() {
    console.log("Menú se está mostrando");
  return (
    <div className="menu-container">
      <div className="menu">
        <div className="menu-options">
          <Link to="/informacion" className="menu-btn">Información</Link>
          <Link to="/registro" className="menu-btn">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;

