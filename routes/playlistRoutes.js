const express = require("express");
const router = express.Router();

const {
    getPlaylists,
} = require("../controllers/playlist");

router.get(
    "/playlists",
    getPlaylists
);

module.exports = router;