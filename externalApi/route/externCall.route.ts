import express, { Express, Response, Request } from 'express';
import { getAllFlight } from '../service/flight.service';

export const externCall: Express = express()


externCall.get('/flight', async (req, res, next) => {
    try {
        await getAllFlight(req, res)
    } catch (error) {
        next(error)
    }
})