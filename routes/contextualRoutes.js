const express = require("express");
const router = express.Router();
const {tokenValidator} = require("../middleweares/validators/tokenValidator");

const {
  getContextualSongs,
  getContextualOptions
} = require("../controllers/contextual");

router.get(
  "/contextual/options",      // returns all contextual options
  getContextualOptions        // returns { activities:[], moods:[], weather:[], genres:[] }
);
router.post(                  // req.body = { activity: int, mood: int, weather: int, genre: [int,...] }
  "/contextual/songs",        // returns [ ]
  tokenValidator,
  getContextualSongs
);
module.exports = router;
