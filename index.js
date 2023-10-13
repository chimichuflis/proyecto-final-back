//--------------LIBRERIAS--------------

const express = require("express");

const users = require("./routes/usersRoutes");

require("dotenv").config();

//Inicializar

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use("/api", users);
