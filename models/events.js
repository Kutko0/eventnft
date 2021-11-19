const fs = require("fs");
const path = require("path");
const { runInThisContext } = require("vm");
const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "products.json");

module.exports = class Event {
    constructor(eventName, quests, cid) {
        this.eventName = eventName;
        this.quests = quests;
        this.cid = cid;
    }
};
