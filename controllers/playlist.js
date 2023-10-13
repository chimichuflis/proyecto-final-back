const knex = require("../config/knexfile");

const getPlaylists = async (req, res) => {
    try {
        const playlists = await knex("playlists").select("*")

        res.json(playlists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
}

module.exports = { getPlaylists }