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

const createMatchPlaylist = async (req,res)=>{
  console.log(req.body.artists);
  const myArray = req.body.artists;
  try{
      const arr = await knex.raw('select * from songs where artist_id in (' + myArray.map(_ => '?').join(',') + ')', [...myArray]);
    return res.json(arr.rows);
  }
  catch(err){
    res.json({pass:false,err:err});
  }
}

module.exports = {getMatchArtists, createMatchPlaylist}
