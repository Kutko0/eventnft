const mongoose = require("mongoose");

const { Schema } = mongoose;
const QuestSchema = new Schema({
    title: {
        type: String,
        required: [true, "Quest is required to have title"],
    },
    description: {
        type: String,
        required: [true, "Quest is required to have description"],
    },
    resolved: {
        type: Boolean,
        default: false,
    },
    eventId: {
        type: String,
        required: [true, "Quest is required to have an Event"],
    },
});

module.exports = mongoose.model("Quest", QuestSchema);
