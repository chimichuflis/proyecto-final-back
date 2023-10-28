const express = require("express");
const router = express.Router();
const {tokenValidator} = require("../middleweares/validators/tokenValidator");

const {
  getPlaylists,
  getPlaylistSongs,
  createPlaylist,
  renamePlaylist,
  playlistAddSong
} = require("../controllers/playlist");

router.get(
    "/playlists",
    tokenValidator,
    getPlaylists
);

router.get(
  "/playlist/:id",
  tokenValidator,
  getPlaylistSongs
);

router.post(
  "/playlist/create",
  tokenValidator,
  createPlaylist
);

router.post(
  "/playlist/rename",
  tokenValidator,
  renamePlaylist
);

router.post(
  "/playlist/addsong",
  tokenValidator,
  playlistAddSong
);

module.exports = router;
