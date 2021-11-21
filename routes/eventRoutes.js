const path = require("path");

const express = require("express");
const eventController = require("../controllers/eventCtr");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/profile", (req, res) => {
    res.render("profile");
});

router.get("/events", eventController.getEvents);
router.get("/quests", eventController.getQuests);
// todo: how to provide params
router.get("/event/:id", eventController.getEvent);
router.get("/quest/:id", eventController.getQuest);
router.post("events/update", eventController.updateEvent);
router.post("quests/update", eventController.updateQuest);
router.delete("/events/delete", eventController.deleteEvent);
router.delete("/quests/delete", eventController.deleteQuest);
module.exports = router;
