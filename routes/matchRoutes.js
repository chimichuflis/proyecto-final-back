const express = require("express");
const router = express.Router();

const {tokenValidator} = require("../middleweares/validators/tokenValidator");
const {
  getMatchArtists,
} = require("../controllers/match");

router.get(
  "/match",      // returns an artists list
  tokenValidator,
  getMatchArtists        // returns []
);

module.exports = router;
