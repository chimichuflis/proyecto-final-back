const knex = require("../config/knexfile");
const getMatchArtists = async (req,res)=>{
  try{
    const artists = await knex("artists")
      .orderBy(knex.raw("random()"))
      .limit(10)
      return res.json({artists:artists});

  }
  catch(err){
    return res.status(500).json({error: err});
  }
}

module.exports = {getMatchArtists}
