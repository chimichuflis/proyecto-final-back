const knex = require("../config/knexfile");


const getSong = async (req, res) => {
  if(req.params.songId){
    try {
      const song = await knex("songs")
        .join("artists", "artists.artist_id", "=", "songs.artist_id")
        .join("genres", "genres.genre_id", "=", "songs.genre_id")
        .select("song_id", "song_name", "album_name", "song_duration", "artist_name", "genre_name")
        .where("song_id", req.params.songId)
        .first()
      if(song){
        return res.json(song);
      }else{
        return res.status(404).json({error:"no encontrado"})
      }
    }
    catch (error) {
      return res.status(500).json({ message: error });
    }
    return res.status(404).json({error:"no encontrado"})
  }
}

const findSongs = async(req,res)=>{
  if(!req.body.value){
    try {
      const songs = await knex("songs")
        .join("artists", "artists.artist_id", "=", "songs.artist_id")
        .select("song_id", "artist_name","songs.artist_id", "song_name", "album_name")
        .limit(20)

      const albumsQuery = await knex("songs")
        .select("album_name", "artist_id")
        .distinctOn("album_name")
        .limit(10)

      const artists = await knex("artists").select("*")
        .limit(10)

      res.json({songs:songs, albums:albumsQuery, artists:artists});
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
  }else{
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
        .select("album_name","artist_id")
        .where("album_name", "like", query)
        .distinctOn("album_name")
        .limit(10)

      const artists = await knex("artists").select("*")
        .where("artist_name", "like", query)
        .limit(10)


      res.json({songs:songs, albums:albumsQuery, artists:artists});
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
  }
}

module.exports = { getSong, findSongs }
