import express, { Express, Response, Request } from 'express';
import { getCurrencyList } from '../service/conversion.services';

export const currency: Express = express()

currency.get('/list', async (req, res, next) => {
    try {
        await getCurrencyList(req, res)
    } catch (error) {
        next(error)
    }
})