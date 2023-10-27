const knex = require("../config/knexfile");

const getSongs = async (req, res) => {
    try {
        const songs = await knex("songs").select("*")
        res.json(songs);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}
const findSongs = async(req,res)=>{
  if(!req.body.value){
    return res.status(401).json("value field is required");
  }
  try {
    const query = `%${req.body.value}%`.toUpperCase();

    const songs = await knex("songs")
      .join("artists", "artists.artist_id", "=", "songs.artist_id")
      .select("song_id", "artist_name","songs.artist_id", "song_name", "album_name")
      .where("song_name","like",query)
      .orWhere("artist_name","like", query)
      .orWhere("album_name", "like", query)
      .limit(20)

    const albumsQuery = await knex("songs")
      .select("album_name")
      .where("album_name", "like", query)
      .first()

    const artists = await knex("artists").select("*")
      .where("artist_name", "like", query)
      .limit(10)


    res.json({songs:songs, albums:albumsQuery, artists:artists});
  }
  catch (error) {
      res.status(500).json({ message: error });
  }
}

module.exports = { getSongs, findSongs }
