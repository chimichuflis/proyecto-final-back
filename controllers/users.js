const knex = require("../config/knexfile");

const usersList = async (req, res) => {
  try {
    const result = await knex("users");
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  usersList,
};
