const express = require("express");
const router = express.Router();
const { tokenValidator } = require("../middleweares/validators/tokenValidator");

const {
  getPlaylists,
  getPlaylistSongs,
  createPlaylist,
  renamePlaylist,
  playlistAddSong,
  getAllPlaylistSongs,
} = require("../controllers/playlist");

router.get("/playlists", tokenValidator, getPlaylists);

router.get("/playlist/:id", tokenValidator, getPlaylistSongs);
router.get("/playlistsongs", tokenValidator, getAllPlaylistSongs);

router.post("/playlist/create", tokenValidator, createPlaylist);

router.post("/playlist/rename", tokenValidator, renamePlaylist);

router.post("/playlist/addsong", tokenValidator, playlistAddSong);

module.exports = router;
