import web3 from "./web3";
import AgriFoodConract from "./build/ AgriFoodContract.json";

export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(AgriFoodConract.interface),
        address
    );
}