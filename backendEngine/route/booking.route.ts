import express, { Express, Response, Request } from 'express';
import { postBooking, getBookingById } from '../services/booking.services';


export const booking: Express = express()


booking.post('/', async (req, res, next) => {
    try {
        console.log('booking.route.ts: booking.post: req.body: ', req.body)
        await postBooking(req, res)
    } catch (error) {
        next(error)
    }
})

booking.get('/id', async (req, res, next) => {
    try {
        await getBookingById(req, res)
    } catch (error) {
        next(error)
    }
})

booking.put('/cancel', async (req, res, next) => {
    try {
        await getBookingById(req, res)
        // todo cancel flight
    } catch (error) {
        next(error)
    }
})
