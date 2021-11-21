const Event = require("../schemas/Event");
const Quest = require("../schemas/Quest");
const mongoose = require("mongoose");

exports.postAddEvent = (req, res, next) => {
    const event = new Event({
        title: req.body.eventTitle,
        organiser: req.body.eventOrganiser,
        dateLive: req.body.dateLive,
    });
    Event.create(event, (err) => {
        if (err) {
            console.log(err);
        }
    });
};

exports.updateEvent = (req, res, next) => {
    const event = new Event({
        id: req.body.eventId,
        title: req.body.eventTitle,
        organiser: req.body.eventOrganiser,
        dateLive: req.body.dateLive,
    });
    Event.findByIdAndUpdate(
        { id },
        { title: event.title, organiser: event.organiser },
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
};

exports.deleteEvent = (req, res, next) => {
    const id = req.body.eventId;
    if (Event.find({ _id: id }).deleteOne() == 1) {
        return true;
    } else return false;
};

exports.getEventsConsole = (callback) => {
    return Event.find({}, callback);
};

exports.getEventConsole = (id, callback) => {
    return Event.find({ _id: id }, callback);
};

exports.getEvent = (req, res, next) => {
    Event.find({ id: req.params.id }).then(
        (event) => {
            Quest.find({ eventId: req.params.id }).then((quests) => {
                res.render("event", { event, quests });
            });
        },
        (error) => {
            res.status(500).send(error);
        }
    );
};

exports.getEvents = (req, res, next) => {
    Event.find({}).then(
        (events) => {
            res.render("events", { events });
        },
        (error) => {
            res.status(500).send(error);
        }
    );
};

exports.addQuest = (req, res, next) => {
    const quest = new Quest({
        title: req.body.questTitle,
        description: req.body.questDescription,
        resolved: false,
    });
    Quest.create(quest, (err) => {
        if (err) {
            console.log(err);
        }
    });
};
exports.updateQuest = (req, res, next) => {
    const quest = new Quest({
        id: req.body.questId,
        title: req.body.eventTitle,
        description: req.body.description,
        resolved: req.body.resolved,
    });
    Quest.findByIdAndUpdate(
        { id },
        {
            title: quest.title,
            description: quest.description,
            resolved: quest.resolved,
        },
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
};

exports.deleteQuest = (req, res, next) => {
    const id = req.body.questId;
    if (Quest.find({ _id: id }).deleteOne() == 1) {
        return true;
    } else return false;
};

exports.getQuest = (req, res, next) => {
    Quest.find({ id: req.params.questId }).then(
        (quest) => {
            res.render("quest", {
                quest,
            });
        },
        (error) => {
            res.status(500).send(error);
        }
    );
};

exports.getQuests = (req, res, next) => {
    Quest.find({}, (err) => {
        if (err) {
            console.log(err);
        }
    }).then((quests) => {
        res.render("quests", {
            quests: quests,
            pageTitle: "All Quests",
            path: "/quests",
        });
    });
};
