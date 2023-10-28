const express = require("express");
const router = express.Router();

const {tokenValidator} = require("../middleweares/validators/tokenValidator");

const {
    getSong,
    findSongs
} = require("../controllers/songs");

router.get(
    "/song/:songId",    // returns { }
    tokenValidator,     // { song_id, song_name, album_name , song_duration , artist_name, genre_name }
    getSong
);

router.post(            // req.body = { value: "" }
  "song/search",        // returns [ {}, {} ]
  findSongs             // { song_id, artist_name, songs.artist_id, song_name, album_name }
);

module.exports = router;
