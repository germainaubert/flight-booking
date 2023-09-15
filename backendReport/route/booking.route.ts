import express, { Express, Response, Request } from 'express';
import { getBookingById } from '../service/booking.services';


export const booking: Express = express()


booking.get('/id', async (req, res, next) => {
    try {
        await getBookingById(req, res)
    } catch (error) {
        next(error)
    }
})