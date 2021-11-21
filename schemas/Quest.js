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
    nft_cid: {
        type: String,
        default: null
    },
    external_contract_url: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model("Quest", QuestSchema);
