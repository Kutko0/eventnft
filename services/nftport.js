const axios = require("axios").default;

const BASE_URL = "https://api.nftport.xyz/v0/";
// image saved via nft.storage
const NFT_PORT_API_KEY = process.env.API_KEY_NFT_PORT;
const ETH_ADDRESS = process.env.ETH_ADDRESS;
const options = { 
    headers: {
            "Authorization": NFT_PORT_API_KEY,
            "Content-Type":"application/json"
        }
    };

const mintNftWithCid = (cid) => {
    return axios.post(BASE_URL + 'mints/easy/urls', {
        "chain": "polygon",
        "name": "Test",
        "description": "Your new NFT",
        "file_url": cid,
        "mint_to_address": ETH_ADDRESS
  },options);
}

const retrieveByTransactionHash = hash => {
    axios.get(BASE_URL + 'mints/' + hash + '?chain=polygon', 
    options);
}

module.exports = { mint_cid: mintNftWithCid, retrieve_by_hash: retrieveByTransactionHash };

 
