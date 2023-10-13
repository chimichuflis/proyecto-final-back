//--------------LIBRERIAS--------------

const express = require("express");

const users = require("./routes/usersRoutes");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

//Inicializar

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use("/api", users);

app.listen(8009, () => {
  console.log("Servidor levantado y escuchando en el puerto 8003");
});
