import checkService from '../services/checkService';
import express, { Request, Response } from 'express';
import { InternalServerError } from '../utils/customError';
import { MESSAGES } from '../constants/messageConstants';


export = {
    check: async (req: Request, res: Response) => {
        try {
            console.log('Inside check controller');
            const check = checkService.check({});
            

            return check;
        } catch (error) {
            // throw new InternalServerError(MESSAGES.ADDRESS_GENERATION_FAILED);
        }
    },
}

