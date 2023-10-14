const knex = require("../config/knexfile");

const getArtists = async (req, res) => {
    try {
        const artists = await knex("artists").select("*")

        res.json(artists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
}

module.exports = { getArtists }