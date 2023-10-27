const knex = require("../config/knexfile");

const getGenres = async (req, res) => {
    try {
        const genres = await knex("genres").select("*")

        res.json(genres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
}

module.exports = { getGenres }