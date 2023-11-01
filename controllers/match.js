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
  try{
    const songArr = [];
    //req.body.artists.forEach(n=>{
      //const arr = await knex("songs")
      //  .where("artist_id", n)
      //songArr.push(...arr);
    //});
    return res.json(songArr);
  }
  catch(err){
    res.json({pass:false,err:err});
  }
}

module.exports = {getMatchArtists, createMatchPlaylist}
