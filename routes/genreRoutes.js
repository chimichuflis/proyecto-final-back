const express = require("express");
const router = express.Router();

const {
    getGenres,
} = require("../controllers/genre");

router.get(
    "/genres",
    getGenres
);

module.exports = router;