import express, { Express, Response, Request } from 'express';
import { Flight } from '../../../contract';
import { getFlightsForInternal, getBookingBydIdForInternal } from '../service/internalFlight.service';

export const internCall: Express = express()

internCall.get('/flight', async (req, res, next) => {
    // #swagger.ignore = true
    try {
        await getFlightsForInternal(req, res);
    } catch (error) {
        next(error)
    }
})

internCall.get('booking/id', async (req, res, next) => {
    try {
        await getBookingBydIdForInternal(req, res);
    } catch(error) {
        next(error);
    }
})