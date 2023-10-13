const express = require("express");
const router = express.Router();

const {
    getActivities,
} = require("../controllers/activity");

router.get(
    "/activities",
    getActivities
);

module.exports = router;