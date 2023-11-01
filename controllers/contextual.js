const knex = require("../config/knexfile");

const getContextualSongs = async (req, res) => {
  let block = "start"
  try{
    const songArr = [];

    // getting songs:
    
    block="geting songs by activity";
    if(req.body.activity){
      const activitySongs = await knex("songs")
        .select("song_id")
        .where("activity_id", req.body.activity)
      songArr.push(...activitySongs);
    }

    block="geting songs by mood";
    if(req.body.mood){
      const moodSongs = await knex("songs")
        .select("song_id")
        .where("mood_id", req.body.mood)
      songArr.push(...moodSongs);
    }

    block="geting songs by weather";
    if(req.body.weather){
      const weatherSongs = await knex("songs")
        .select("song_id")
        .where("weather_id", req.body.weather)
      songArr.push(...weatherSongs);
    }

    block="geting songs by genres";
    if(req.body.genre[0]){
      const genre0Songs = await knex("songs")
        .select("song_id")
        .where("genre_id", req.body.genre[0])
      songArr.push(...genre0Songs);

      if(req.body.genre[1]){
        const genre1Songs = await knex("songs")
          .select("song_id")
          .where("genre_id", req.body.genre[1])
        songArr.push(...genre1Songs);

        if(req.body.genre[2]){
          select("song_id")
          const genre2Songs = await knex("songs")
            .where("genre_id", req.body.genre[2])
          songArr.push(...genre2Songs);
        }
      }
    }

    // return if no songs
    if(songArr.length==0){
      return res.json({pass: false, msg: "no songs found"});
    }
    console.log(songArr);

    block="generating new playlist";
    const newPlaylist = await knex("playlists")
      .insert(
        {
          user_id: req.user.id,
          playlist_name: "Nuevo playlist contextual"
        }
      ).returning("*")
    console.log("playlist created: ", newPlaylist);

    block="generating insert query";
    const insertQuery = [];
    songArr.forEach((item,index)=>{
      const itemPos = songArr.findIndex(n=>{
        return n.song_id==item.song_id;
      });
      if(index == itemPos){
        insertQuery.push({song_id: item.song_id, playlist_id:newPlaylist[0].playlist_id});
      }
    });
    console.log(insertQuery);

    block="adding songs to playlist";
    const addingSongs = await knex("playlists_songs")
      .insert(insertQuery)

    return res.json({pass:true,playlist_id:newPlaylist[0].playlist_id, msg: "playlist generated succesfully"});
  } catch (error) {
    console.log({block:block,error:error});
    return res.json("something went wrong")
  }
}
/////////////////////////////////////////////////////////////////////

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
