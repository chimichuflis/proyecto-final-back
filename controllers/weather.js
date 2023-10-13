const knex = require("../config/knexfile");

const getWeather = async (req, res) => {
    try {
        const weather = await knex("weather").select("*")

        res.json(weather);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
}

module.exports = { getWeather }