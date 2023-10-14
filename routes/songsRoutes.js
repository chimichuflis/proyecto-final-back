const express = require("express");
const router = express.Router();

const {
    getSongs,
} = require("../controllers/songs");

router.get(
    "/songs",
    getSongs
);

module.exports = router;