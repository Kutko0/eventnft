const fs = require("fs");
const path = require("path");
const { runInThisContext } = require("vm");
const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "products.json");

module.exports = class Quest {
    constructor(questName, task, reward) {
        this.questName = questName;
        this.task = task;
        this.reward = reward;
    }
};
