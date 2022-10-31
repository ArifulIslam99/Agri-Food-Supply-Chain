import web3 from "./web3";

import requestFactory from "./build/ requestFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(requestFactory.interface),
    "0x4294D0Be95C18C8296adBF01340277115989D974"

);

export default instance;