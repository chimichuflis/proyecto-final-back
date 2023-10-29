const knex = require("../config/knexfile");

const getPlaylists = async (req, res) => {
  try {
    /*
    const playlists = await knex("playlists")
      .select("playlist_id","playlist_name")
      .where("user_id", req.user.id)

    res.json(playlists);
    */
    const playlists = await knex("playlists_songs")
      .join("playlists", "playlists.playlist_id", "=", "playlists_songs.playlist_id")
      .join("songs", "songs.song_id", "=", "playlists_songs.song_id")
      .select(
        "playlists_songs.playlist_id",
        "playlist_name",
        "artist_id"
      )
      .where("user_id", req.user.id)
      .distinctOn("playlists_songs.playlist_id")

    return res.json(playlists)
  }
  catch (error) {
      res.status(500).json({ message: error });
  }
}

const getPlaylistSongs = async(req,res)=>{
  try{
      const playlistSongs = await knex("playlists_songs")
        .join("playlists", "playlists.playlist_id", "=", "playlists_songs.playlist_id")
        .join("songs", "songs.song_id", "=", "playlists_songs.song_id")
        .join("genres", "genres.genre_id", "=", "songs.genre_id")
        .join("artists", "songs.artist_id", "=", "artists.artist_id")
        .select("songs.song_id","song_name", "album_name", "song_duration", "genre_name", "artist_name")
        .where("user_id",req.user.id)
        .andWhere("playlists_songs.playlist_id", req.params.id)
      return res.json(playlistSongs)
  }
  catch(err){
    return res.status(500).json(err)
  }
}


const createPlaylist = async (req,res) => {
  try{
    const newPlaylist = await knex("playlists")
      .insert(
        {
          user_id: req.user.id,
          playlist_name: req.body.name
        }
      ).returning("*")
    res.json({pass:true, msg:"playlist created succesfuly",newPlaylist:newPlaylist[0].playlist_id});
  }
  catch(err){
    res.status(500).json({pass: false, msg: err});
  }
}

const renamePlaylist = async (req, res)=>{
 try{
    await knex("playlists")
      .where("playlist_id",req.body.id)
      .andWhere("user_id", req.user.id)
      .update(
        {
          playlist_name: req.body.name
        }
      )
      res.json({pass: true, msg: "playlist name updated"});
  }
  catch(err){
    res.status(500).json({pass: false, msg: err});
  }
}

const playlistAddSong = async(req,res)=>{
  try{
    await knex("playlists_songs")
      .insert(
        {
          playlist_id: req.body.playlistId,
          song_id: req.body.songId
        }
      )
      res.json({pass: true, msg: "song inserted succesfuly"});
  }
  catch(err){
    res.status(500).json({pass: false, msg: err});
  }
}

module.exports = { getPlaylists, getPlaylistSongs, createPlaylist, renamePlaylist, playlistAddSong }
