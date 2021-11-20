module.exports = class Event {
    constructor(eventName, quests, cid) {
        this.eventName = eventName;
        this.quests = quests;
        this.cid = cid;
    }
};
