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
      if(arr.rows.length==0){
        return res.json({pass:false, msg:"no songs found"});
      }
      const newPlaylist = await knex("playlists")
        .insert(
        {
        user_id: req.user.id,
          playlist_name: "playlist de cupido musical"
        }
      ).returning("*")
    console.log("playlist created ", newPlaylist);

    //---------------------------------------------
  
    const insertQuery = [];
    arr.rows.forEach((item,index)=>{
      const itemPos = arr.rows.findIndex(n=>{
        return n.song_id==item.song_id;
      })
      if(index == itemPos){
        insertQuery.push({
          song_id: item.song_id,
          playlist_id: newPlaylist[0].playlist_id
        });
      }
    });
    console.log(insertQuery);

  //--------------------------------------------------
  
    const addingSongs = await knex("playlists_songs")
      .insert(insertQuery)

    return res.json({pass: true, playlist_id:newPlaylist[0].playlist_id, msg: "playlist generated succesfully"});

  }
  catch(err){
    res.json({pass:false,err:err});
  }
}

module.exports = {getMatchArtists, createMatchPlaylist}
