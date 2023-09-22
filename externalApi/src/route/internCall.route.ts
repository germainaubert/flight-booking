import express, { Express, Response, Request } from 'express';
import { Flight } from '../../../contract';
import { getFlightsForInternal, getBookingBydIdForInternal } from '../service/internalFlight.service';
import { cancelBooking } from '../service/booking.service';

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
    } catch (error) {
        next(error);
    }
})

internCall.post('booking/cancel', async (req, res, next) => {
    try {
        await cancelBooking(req, res);
    } catch(error) {
        console.log(error);
    }
})