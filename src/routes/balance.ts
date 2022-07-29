import balanceController from '../controllers/balanceController';
import { response } from '../utils/responseUtil';

const express = require("express");
const router = express.Router();

router.get(
    "/",
    response(balanceController.fetchBalance)
);

router.get(
    "/fetch-gas-limit",
    response(balanceController.fetchLatestGas)
);

router.get(
    "/create-wallet",
    response(balanceController.createWallet)
);

router.post(
    "/make-transaction",
    response(balanceController.makeTransaction)
);

router.get(
    "/transaction-status",
    response(balanceController.transactionStatus)
);

export = router;
