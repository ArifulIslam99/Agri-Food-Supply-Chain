const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledRequest = require("./build/ requestFactory.json");
 
const provider = new HDWalletProvider(
  "pet urge issue april cave light million indoor describe hair daring vanish",
  "https://goerli.infura.io/v3/8eb7e78fbeb940939666a2cd1ca5ca90"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract( 
     JSON.parse(compiledRequest.interface))
    .deploy({ data: compiledRequest.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);

  provider.engine.stop();
};
deploy(); 

// Contract deployed to  0x4294D0Be95C18C8296adBF01340277115989D974