const Event = require("../schemas/Event");
const Quest = require("../schemas/Quest");
const mongoose = require("mongoose");
const { mint_cid } = require("../services/nftport");
const MOCK_CID =
    "https://bafkreibop7yidbnljbs45cu22nujxvqsl5uss422d7fp3tjqo2inrhynra.ipfs.dweb.link/";
    

exports.postAddEvent = (req, res, next) => {
    const event = new Event({
        title: req.body.title,
        organiser: req.body.organiser,
        dateLive: req.body.dateLive,
    });
    Event.create(event, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/events");
    });
};

exports.postAddQuest = (req, res, next) => {
    const quest = new Quest({
        title: req.body.title,
        description: req.body.description,
        eventId: req.body.eventId,
    });
    Quest.create(quest, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/event/" + req.body.eventId);
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
                res.status(500).send(result);
            }
        }
    );
};

exports.deleteEvent = (req, res, next) => {
    Event.find({ _id: req.params.id }).deleteOne().then(
        res.redirect("/events")
    )
};

exports.getEventsConsole = (callback) => {
    return Event.find({}, callback);
};

exports.getEventConsole = (id, callback) => {
    return Event.find({ _id: id }, callback);
};

exports.getEvent = (req, res, next) => {
    Event.findOne({ id: req.params.id }).then(
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
    Quest.findOne({ _id: req.params.id }).then(
        (quest) => {
            Quest.find({ _id: req.params.id }).deleteOne().then(() => {
                res.redirect("/event/" + quest.eventId);
            }) 
        }
    )
};

exports.getQuest = (req, res, next) => {
    Quest.findOne({ _id: req.params.id }).then(
        (quest) => {
            res.render("quest", { quest });
        },
        (error) => {
            res.status(500).send(error);
        }
    );
};


exports.completeQuest = (req, res) => {
    let questId = req.params.id;

    Quest.findOne({_id: questId}).then( (quest) => {
        if (quest.resolved) {
            res.render('quest', { quest });
        } else {
            mint_cid(MOCK_CID).then((response) => {
                Quest.updateOne({_id: questId}, {resolved: true, external_contract_url: response.data.transaction_external_url, nft_cid: MOCK_CID}).then(() => {
                    Quest.findOne({_id: questId}).then( (quest) => {
                        console.log(response.data);
                        res.render('quest', { quest });
                    });
                });
              })
              .catch((error) => {
                console.log(error);
              });
        }
    });

}