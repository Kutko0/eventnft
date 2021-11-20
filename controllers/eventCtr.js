const Event = require("../models/event");
const Quest = require("../models/quest");

exports.getEvents = (req, res, next) => {
    Event.fetchAll((events) => {
        //NAPOJIT DATABAZU SEM
        res.render("events", {
            prods: products,
            pageTitle: "All Events",
            path: "/events",
        });
    });
};

exports.getQuests = (req, res, next) => {
    Quest.fetchAll((quests) => {
        //NAPOJIT DATABAZU SEM
        res.render("events", {
            prods: quests,
            pageTitle: "All Quests of a event",
            path: "/event/quests",
        });
    });
};
