//--------------LIBRERIAS--------------

const express = require("express");

const user = require("./routes/userRoutes");
const contextual = require("./routes/contextualRoutes")
const songs = require("./routes/songsRoutes")
const playlists = require("./routes/playlistRoutes")
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const port = 8009;

//Inicializar

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", user);
app.use("/api", contextual);
app.use("/api", songs);
app.use("/api", playlists);

app.listen(port, () => {
  console.log("Servidor levantado y escuchando en el puerto " + port);
});
