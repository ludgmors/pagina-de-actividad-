import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connection from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta para registrar un usuario
app.post("/api/registrar", (req, res) => {
    const { nombreEquipo, semestre, carrera, genero, nombre, apellido, carnet, seccion } = req.body;
  
    // Validamos que no haya campos vacíos
    if (!nombreEquipo || !semestre || !carrera || !genero || !nombre || !apellido || !carnet || !seccion) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }
  
    // SQL para registrar los datos
    const sql = "INSERT INTO registros (nombre_equipo, semestre, carrera, genero, nombre, apellido, carnet, seccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
    connection.query(sql, [nombreEquipo, semestre, carrera, genero, nombre, apellido, carnet, seccion], (err, result) => {
      if (err) {
        console.error("Error en el registro:", err);
        res.status(500).json({ mensaje: "Error al registrar" });
      } else {
        res.status(200).json({ mensaje: "Registro exitoso" });
      }
    });
  });
  

// Ruta para guardar la respuesta "Sí/No"
app.post("/api/participacion", (req, res) => {
    console.log("Cuerpo de la solicitud recibida:", req.body);

  const { deseaParticipar } = req.body;
  console.log("Valor recibido en el backend:", deseaParticipar); // CORREGIDO ✅

  if (!deseaParticipar) {
    return res.status(400).json({ mensaje: "El campo desea_participar es obligatorio" });
  }

  const sql = "INSERT INTO participacion (desea_participar) VALUES (?)";

  connection.query(sql, [deseaParticipar], (err, result) => {
    if (err) {
      console.error("Error al guardar participación:", err);
      res.status(500).json({ mensaje: "Error al guardar" });
    } else {
      res.status(200).json({ mensaje: "Guardado correctamente" });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

