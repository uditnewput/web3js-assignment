import balanceService from '../services/balanceService';
import express, { Request, Response } from 'express';
import { InternalServerError } from '../utils/customError';
import { MESSAGES } from '../constants/messageConstants';


export = {
    fetchBalance: async (req: Request, res: Response) => {
        try {
            console.log('Inside fetchBalance controller');
            console.log(req.query.address);
            const address = <string>req.query.address;
            const network = <string>req.query.network || 'testnet';
            const check = await balanceService.fetchBalance(address, network);

            return check;
        } catch (error: any) {
            console.log(error);
            throw new InternalServerError(MESSAGES.BALANCE_FETCH_FAILED, error);
        }
    },
    fetchLatestGas: async (req: Request, res: Response) => {
        try {
            console.log('Inside fetchLatestGas controller');
            const network = <string>req.query.network || 'testnet';
            const gas = await balanceService.fetchLatestGas(network);

            return gas;
        } catch (error: any) {
            console.log(error);

            throw new InternalServerError(MESSAGES.GAS_FETCH_FAILED, error);
        }
    },
    createWallet: async (req: Request, res: Response) => {
        try {
            console.log('Inside createWallet controller');
            const network = <string>req.query.network || 'testnet';
            const check = await balanceService.createWallet(network);

            return check;
        } catch (error: any) {
            console.log(error);
            throw new InternalServerError(MESSAGES.WALLET_CREATION_FAILED, error);
        }
    },
    makeTransaction: async (req: Request, res: Response) => {
        try {
            console.log('Inside fetchBalance controller');
            console.log(req.query.address);
            const reqData = {
                receiverAddress: req.body.receiverAddress,
                senderAddress: req.body.senderAddress,
                senderPK: req.body.senderPrivateKey,
                amountInEth: req.body.amount
            };
            const network = <string>req.query.network || 'testnet';
            const check = await balanceService.makeTransaction(reqData, network);

            return check;
        } catch (error: any) {
            console.log(error);
            throw new InternalServerError(MESSAGES.ETH_TXN_FAILED, error);
        }
    },
    transactionStatus: async (req: Request, res: Response) => {
        try {
            console.log('Inside transactionStatus controller');
            console.log(req.query.txn);
            const txnHash = req.query.txn || '';
            // if (txnHash.length > 64) {

            // }
            const network = <string>req.query.network || 'testnet';
            const check = await balanceService.transactionStatus(txnHash, network);

            return check;
        } catch (error: any) {
            console.log(error);
            throw new InternalServerError(MESSAGES.ETH_TXN_FAILED, error);
        }
    },
}

