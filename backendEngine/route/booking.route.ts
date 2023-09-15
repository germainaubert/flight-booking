import express, { Express, Response, Request } from 'express';
import { postBooking } from '../services/booking.services';


export const booking: Express = express()


booking.post('/', async (req, res, next) => {
    try {
        await postBooking(req, res)
    } catch (error) {
        next(error)
    }
})