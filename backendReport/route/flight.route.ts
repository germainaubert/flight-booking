import express, { Express, Response, Request } from 'express';
import { getAllFlights, getFlightsByBookingId, getFlightsById } from '../service/flights.services';
import { Currency } from '../../contract';


export const flight: Express = express()


flight.get('/id', async (req, res, next) => {
    try {
        await getFlightsById(req, res)
    } catch (error) {
        next(error)
    }
})
flight.get('/bookingId', async (req, res, next) => {
    try {
        await getFlightsByBookingId(req, res)
    } catch (error) {
        next(error)
    }
})
flight.get('/', async (req: Request<unknown, unknown, unknown, Currency>, res, next) => {
    try {
        await getAllFlights(req, res)
    } catch (error) {
        next(error)
    }
})
