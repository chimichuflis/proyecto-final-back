const express = require("express");
const router = express.Router();

const {tokenValidator} = require("../middleweares/validators/tokenValidator");
const {
  getMatchArtists,
  createMatchPlaylist
} = require("../controllers/match");

router.get(
  "/match",      // returns an artists list
  tokenValidator,
  getMatchArtists        // returns []
);

router.post(
  "match/newplaylist",
  tokenValidator,
  createMatchPlaylist
)

module.exports = router;
