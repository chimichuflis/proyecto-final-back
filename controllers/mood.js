const knex = require("../config/knexfile");

const getMoods = async (req, res) => {
    try {
        const moods = await knex("moods").select("*")

        res.json(moods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
}

module.exports = { getMoods }