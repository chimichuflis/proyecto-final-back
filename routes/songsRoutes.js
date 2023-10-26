const express = require("express");
const router = express.Router();

const tokenValidator = require("../middleweares/validators/tokenValidator");

const {
    getSongs,
    getTest,
    findSongs
} = require("../controllers/songs");


router.get("/test", getTest);


router.get(
    "/songs",
    //tokenValidator,
    getSongs
);

router.get(
  "/search",
  //tokenValidator,
  findSongs
);

module.exports = router;
