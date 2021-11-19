const path = require("path");

const express = require("express");
const eventController = require("../controllers/eventCtr");
const router = express.Router();

router.get("/");

router.get("/events", eventController.getEvents);
router.get(":event/quests", evemtController.getQuests);

module.exports = router;
