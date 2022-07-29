const Web3 = require('web3');

export = {
  check: async (reqData: any) => {
    const web3 = new Web3(Web3.givenProvider);
    // console.log(web3);
    console.log(Web3.givenProvider); // If this property is null you should connect to a remote/local node.

    return Web3.givenProvider;
  },

  sendTransaction: async (reqData: any) => {
    const web3 = new Web3(Web3.givenProvider);
    // console.log(web3);
    web3.eth.sendTransaction({ from: '0x123...', data: '0x432...' })
      // .once('sending', (payload) => { ... })
      // .once('sent', (payload) => { ... })
      // .once('transactionHash', (hash) => { ... })
      // .once('receipt', (receipt) => { ... })
      // .on('confirmation', (confNumber, receipt, latestBlockHash) => { ... })
      // .on('error', (error) => { ... })
      .then((receipt: any) => {
        console.log(receipt);
        
        // will be fired once the receipt is mined
      });

return Web3.givenProvider;
  },
}