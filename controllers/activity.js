const knex = require("../config/knexfile");

const getActivities = async (req, res) => {
    try {
        const activities = await knex("activities").select("*")

        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
}

module.exports = { getActivities }