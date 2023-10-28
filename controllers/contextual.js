const knex = require("../config/knexfile");

const getContextualSongs = async (req, res) => {
  const songArr = [];
  const errArr = [];
  try{
    if(req.body.activity){
      const activitySongs = await knex("songs")
        .where("activity_id", req.body.activity)
      songArr.push(...activitySongs);
    }
  }
  catch(err){
    errArr.push(err);
  }
  try{
    if(req.body.mood){
      const moodSongs = await knex("songs")
        .where("mood_id", req.body.mood)
      songArr.push(...moodSongs);
    }
  }
  catch(err){
    errArr.push(err);
  }
  try{
    if(req.body.weather){
      const weatherSongs = await knex("songs")
        .where("weather_id", req.body.weather)
      songArr.push(...weatherSongs);
    }
  }
  catch(err){
    errArr.push(err);
  }
  try{
    if(req.body.genre[0]){
      const genre0Songs = await knex("songs")
        .where("genre_id", req.body.genre[0])
      songArr.push(...genre0Songs);

      if(req.body.genre[1]){
        const genre1Songs = await knex("songs")
          .where("genre_id", req.body.genre[1])
        songArr.push(...genre1Songs);

        if(req.body.genre[2]){
          const genre2Songs = await knex("songs")
            .where("genre_id", req.body.genre[2])
          songArr.push(...genre2Songs);
        }
      }
    }
  }
  catch(err){
    errArr.push(err);
  }
  return res.json({songs:songArr, errors:errArr});
}

const getContextualOptions = async (req,res)=>{
  const resObj = {}
  try{
      const activities = await knex("activities")
        .select("*")
      resObj.activities = activities;

      const moods = await knex("moods")
        .select("*")
      resObj.moods = moods;

      const weather = await knex("weather")
        .select("*")
      resObj.weather = weather;

      const genres = await knex("genres")
        .select("*")
      resObj.genres = genres;

  }
  catch(err){
    return res.status(500).json(err);
  }
res.json(resObj)
}
module.exports = { getContextualSongs, getContextualOptions }
