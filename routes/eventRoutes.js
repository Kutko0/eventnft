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
router.get("/event/:id", eventController.getEvent);
router.get("/quest/:id", eventController.getQuest);

router.post("/event", eventController.postAddEvent);
router.post("/quest", eventController.postAddQuest)
router.post("events/update", eventController.updateEvent);
router.post("quests/update", eventController.updateQuest);

router.get("/event/:id/delete", eventController.deleteEvent);
router.get("/quest/:id/delete", eventController.deleteQuest);

router.get("/quest/:id/complete", eventController.completeQuest)

module.exports = router;
