const nft = require("nft.storage");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");

dotenv.config();
const app = express();
const port = process.env.APP_PORT;
const uri =
    "mongodb+srv://" +
    process.env.DB_NAME +
    ":" +
    process.env.DB_PASS +
    "@defest.56ckm.mongodb.net/defest_events?retryWrites=true&w=majority";
const client = new nft.NFTStorage({ token: process.env.API_KEY_NFT_STORAGE });
const MOCK_CID =
    "https://bafkreibop7yidbnljbs45cu22nujxvqsl5uss422d7fp3tjqo2inrhynra.ipfs.dweb.link/";

// Load models
const Event = require("./schemas/Event");
const Quest = require("./schemas/Quest");
const path = require("path");
const eventController = require("./controllers/eventCtr");

app.use(express.static(path.join(__dirname, "public")));
//app.use(eventRoutes);
app.listen(port, () => {
    console.log("Server is running at port: " + port);
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
            uri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log("Mongoose is connected")
        );
    } catch (e) {
        console.log("could not connect");
    }

    const example = new Event({
        title: "Example15 event",
        organiser: "Struky Shmoe",
        dateLive: new Date(2022, 10, 20),
    });

    const questExample = new Quest({
        title: "Kiss 3 bartenders without sexually offendimg them",
        description: "Don't be a pussy and do it",
        eventId: "619941823f23a5d7732ad103",
    });

    example.questList = [questExample];

    Event.create(example, (err) => {
        if (err) {
            console.log(err);
        }
    });

    Quest.create(questExample, (err) => {
        if (err) {
            console.log(err);
        }
    });

    // eventController.getEventsConsole((error, events) => {
    //     if (events) {
    //         console.log(events);
    //     } else {
    //         console.log("no results");
    //     }
    // });

    eventController.getEventConsole(
        "619941823f23a5d7732ad103",
        (error, event) => {
            if (event) {
                console.log(event);
            } else {
                console.log(error);
            }
        }
    );
});
//--------------------------
// NFT STORAGE EXAMPLE START
const executeNftSaveAndCheck = async () => {
    const cid = await client.storeBlob(new nft.Blob(["My new saved nft"]));
    await checkNftSaved(cid);
    await statusOfNftByCid(cid);
    await deleteNftBydCid(cid);

    console.log(cid);
};

const checkNftSaved = async (cid) => {
    const res = await client.check(cid);
    console.log(res);
};

const statusOfNftByCid = async (cid) => {
    const res = await client.status(cid);
    console.log(res);
};

// might be still provided after deletion due to being store in other ndoes
const deleteNftBydCid = async (cid) => {
    await client.delete(cid);
    console.log(cid + " => NFT cid deleted");
};

// NFT STORAGE EXAMPLE END
//------------------------
const mintByCid = require("./services/nftport").mint_cid;
const retrieve_by_hash = require("./services/nftport").retrieve_by_hash;
// mintByCid(MOCK_CID);
retrieve_by_hash(
    "0x90239c479c539cdb033bca8a55c622fdac9b6d050a1c90917684a08eaeb047b2"
);

//-----------------------
// NFT PORT EXAMPLE START
