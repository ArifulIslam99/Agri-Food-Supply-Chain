import Web3 from "web3";

let web3;

if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
    // we are in the browser and metamask is running
    window.ethereum.request({method: "eth_requestAccounts"});
    web3 = new Web3(window.ethereum);
}
else{
    // we are on the server or user does not use metamask

    const provider  = new Web3.providers.HttpProvider(
        "https://goerli.infura.io/v3/8eb7e78fbeb940939666a2cd1ca5ca90"
    );

    web3 = new Web3(provider);
}



export default web3;