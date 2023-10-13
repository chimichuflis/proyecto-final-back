const express = require("express");
const router = express.Router();

const {
    getArtists,
} = require("../controllers/artists");

router.get(
    "/artists",
    getArtists
);

module.exports = router;