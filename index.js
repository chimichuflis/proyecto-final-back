//--------------LIBRERIAS--------------

const express = require("express");

const user = require("./routes/userRoutes");
const artists = require("./routes/artistRoutes")
const activities = require("./routes/activityRoutes")
const moods = require("./routes/moodRoutes")
const weather = require("./routes/weatherRoutes")
const genres = require("./routes/genreRoutes")
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
app.use("/api", artists);
app.use("/api", activities);
app.use("/api", moods);
app.use("/api", weather);
app.use("/api", genres);
app.use("/api", songs);
app.use("/api", playlists);

app.listen(port, () => {
  console.log("Servidor levantado y escuchando en el puerto " + port);
});
