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
    axios.post(BASE_URL + 'mints/easy/urls', {
        "chain": "polygon",
        "name": "Test of my sexy face",
        "description": "Just testing this sexy guy",
        "file_url": cid,
        "mint_to_address": ETH_ADDRESS
  },options)
  .then((response) => {
    console.log("Minted to:");
    console.log(response.data.mint_to_address);
    console.log("Transaction hash:");
    console.log(response.data.transaction_hash);
    console.log("Retrieving...");
    retrieveByTransactionHash(response.data.transaction_hash);
  })
  .catch((error) => {
    console.log(error);
  });
}

const retrieveByTransactionHash = hash => {
    axios.get(BASE_URL + 'mints/' + hash + '?chain=polygon', 
    options)
    .then( (response) => {
        // handle success
        console.log(response.data);
    })
    .catch( (error) => {
        // handle error
        console.log(error);
    });
}

module.exports = { mint_cid: mintNftWithCid, retrieve_by_hash: retrieveByTransactionHash };

