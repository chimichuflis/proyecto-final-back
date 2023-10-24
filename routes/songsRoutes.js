const express = require("express");
const router = express.Router();

const {
    getSongs,
    getTest
} = require("../controllers/songs");


router.get("/test", getTest);


router.get(
    "/songs",
    getSongs
);

module.exports = router;
