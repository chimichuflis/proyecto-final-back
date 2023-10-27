const express = require("express");
const router = express.Router();

const tokenValidator = require("../middleweares/validators/tokenValidator");

const {
    getSongs,
    findSongs
} = require("../controllers/songs");

router.get(
    "/songs",
    //tokenValidator,
    getSongs
);

router.post(
  "/search",
  //tokenValidator,
  findSongs
);

module.exports = router;
