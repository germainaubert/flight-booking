import express, { Express, Response, Request } from 'express';
import { getAllFlight, getflightByBookingId, getflightById } from '../service/flight.service';
import { getBookingById } from '../service/booking.service';

export const externCall: Express = express()

externCall.get('/flight', async (req, res, next) => {
    try {
        await getAllFlight(req, res)
    } catch (error) {
        next(error)
    }
})

externCall.get('/flight/id', async (req, res, next) => {
    try {
        await getflightById(req, res)
    } catch (error) {
        next(error)
    }
})

externCall.get('/flight/bookingId', async (req, res, next) => {
    try {
        await getflightByBookingId(req, res)
    } catch (error) {
        next(error)
    }
})

externCall.get('/booking/id', async (req, res, next) => {
    try {
        await getBookingById(req, res)
    } catch (error) {
        next(error)
    }
})