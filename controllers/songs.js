const knex = require("../config/knexfile");

const getSongs = async (req, res) => {
    try {
        const songs = await knex("songs").select("*")
        res.json(songs);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
}
const getTest = async (req,res)=>{
  const songs = await knex("songs").select("*")
  res.json(songs);
}

module.exports = { getSongs, getTest }
