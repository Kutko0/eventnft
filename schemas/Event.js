const mongoose = require("mongoose");

const { Schema } = mongoose;
const EventSchema = new Schema({
    title: {
        type: String,
        required: [true, "Event is required to have title"],
    },
    organiser: {
        type: String,
        required: [true, "Event is required to have an organiser"],
    },
    questList: [{ type: Schema.Types.ObjectId, ref: "Quest" }],
    dateCreated: { type: Date, default: Date.now },
    dateLive: {
        type: Date,
        required: [true, "Event needs a time of starting."],
    },
});

module.exports = mongoose.model("Event", EventSchema);
