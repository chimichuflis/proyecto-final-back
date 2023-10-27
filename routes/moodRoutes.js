const express = require("express");
const router = express.Router();

const {
    getMoods,
} = require("../controllers/mood");

router.get(
    "/moods",
    getMoods
);

module.exports = router;