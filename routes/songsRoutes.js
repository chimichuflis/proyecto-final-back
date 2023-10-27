const express = require("express");
const router = express.Router();

const tokenValidator = require("../middleweares/validators/tokenValidator");

const {
    getSongs,
    getTest
} = require("../controllers/songs");


router.get("/test", getTest);


router.get(
    "/songs",
    tokenValidator,
    getSongs
);

module.exports = router;
