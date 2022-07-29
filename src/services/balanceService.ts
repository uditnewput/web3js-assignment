// const Web3 = require('web3');

import Web3 from 'web3';
export = {
  fetchBalance: async (address: string, network: string) => {
    try {
      const selectedNetwork = getNetwork(network);
      const web3 = new Web3(new Web3.providers.HttpProvider(selectedNetwork)); // mainnet
      web3.eth.getBlockNumber().then(console.log);

      const balance = await web3.eth.getBalance(address);
      console.log(`Balance: ${balance}`);

      const balanceInEth = web3.utils.fromWei(balance, 'ether');
      console.log(`balanceInEth: ${balanceInEth}`);

      return { balanceInEth };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  fetchLatestGas: async (network: string) => {
    try {
      const selectedNetwork = getNetwork(network);
      const web3 = new Web3(new Web3.providers.HttpProvider(selectedNetwork)); // mainnet
      web3.eth.getBlockNumber().then(console.log);

      const gas = (await web3.eth.getBlock("latest")).gasLimit
      const gasPrice = await web3.eth.getGasPrice();
      const gasPriceInEth = web3.utils.fromWei(gasPrice, 'ether');

      return { gasLimit: gas, gasPrice, gasPriceInEth };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createWallet: async (network: string) => {
    try {
      const selectedNetwork = getNetwork(network);
      const web3 = new Web3(new Web3.providers.HttpProvider(selectedNetwork)); //ropsten

      web3.eth.getBlockNumber().then(console.log);
      const wallet = web3.eth.accounts.create();

      console.log(`wallet: ${JSON.stringify(wallet)}`);
      console.log(web3.eth.accounts.wallet);
      console.log(web3.eth.defaultAccount);

      return { wallet };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  makeTransaction: async (data: any, network: string) => {
    try {
      const selectedNetwork = getNetwork(network);
      const web3 = new Web3(new Web3.providers.HttpProvider(selectedNetwork)); //ropsten

      web3.eth.getBlockNumber().then(console.log);

      const senderBalanceInWei = await web3.eth.getBalance(data.senderAddress);
      const senderBalanceInEth = web3.utils.fromWei(senderBalanceInWei, 'ether');

      console.log(`senderBalanceInEth: ${senderBalanceInEth}`);
      if (senderBalanceInEth < data.amountInEth) {
        console.log('UNsufficient balance');
        throw new Error('UNsufficient balance');
      }
      console.log('sufficient balance');

      // signing the transaction
      const options = {
        to: data.receiverAddress,
        // data: data.encodeABI(),
        gas: (await web3.eth.getBlock("latest")).gasLimit,
        // chain: 'ropsten',
        // hardfork: 'petersburg'
      };
      const signedTxn = await web3.eth.accounts.signTransaction(options, data.senderPK);
      console.log('transaction signed');
      console.log('raw txn');
      console.log(signedTxn.rawTransaction);

      // sending signed transaction
      // const receipt = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction);
      let txnHash;

      signedTxn.rawTransaction && 
      await web3.eth.sendSignedTransaction(signedTxn.rawTransaction).on('receipt', (transaction: { transactionHash: any; status: any; }) => {
        console.log(`Transaction Processing ReferenceID is :${transaction.transactionHash}`)
        console.log(`Status: ${transaction.status}`)
        txnHash = transaction.transactionHash;
      })

      return { txnHash };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  transactionStatus: async (txn: any, network: string) => {
    try {
      const selectedNetwork = getNetwork(network);
      const web3 = new Web3(new Web3.providers.HttpProvider(selectedNetwork)); //ropsten

      web3.eth.getBlockNumber().then(console.log);


      const txnDetails = await web3.eth.getTransactionReceipt(txn);

      return { txnDetails };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

function getNetwork(networkType: string) {
  return networkType === 'mainnet'
    ? 'https://mainnet.infura.io/v3/25d98d99fa794d0da68d1b37a41b0edc'
    : 'https://ropsten.infura.io/v3/25d98d99fa794d0da68d1b37a41b0edc';
}

