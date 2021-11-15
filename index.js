const nft = require("nft.storage");
const dotenv = require("dotenv");

dotenv.config();

const client = new nft.NFTStorage({ token: process.env.API_KEY });

const executeNftSaveAndCheck = async () => {
    const cid = await client.storeBlob(new nft.Blob(['My new saved nft']));
    await checkNftSaved(cid);
    await statusOfNftByCid(cid);
    await deleteNftBydCid(cid);

    console.log(cid);
}

const checkNftSaved = async cid => {
    const res = await client.check(cid);
    console.log(res);
}

const statusOfNftByCid = async cid => {
    const res = await client.status(cid);
    console.log(res); 
}

// might be still provided after deletion due to being store in other ndoes
const deleteNftBydCid = async cid => {
    await client.delete(cid);
    console.log(cid + " => NFT cid deleted");
}

executeNftSaveAndCheck();
