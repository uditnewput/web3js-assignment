import checkController from '../controllers/checkController';
import { response } from '../utils/responseUtil';

const express = require("express");
const router = express.Router();

router.get(
    "/",
    response(checkController.check)
);

export = router;
