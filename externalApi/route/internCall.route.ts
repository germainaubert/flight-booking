import express, { Express, Response, Request } from 'express';
import { Flight } from '../../contract';
import { getFlightsForInternal } from '../service/internalFlight.service';

export const internCall: Express = express()

internCall.get('/flight', async (req, res, next) => {
    // try {
    //     await getFlightsForInternal(req, res);
    // } catch (error) {
    //     next(error)
    // }
    res.send('intern API ok')
})