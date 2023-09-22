import express, { Express, Request, Response } from 'express';
import { Booking } from '../../../contract';
import { addBookingToQueue } from '../queueHandler';

export const booking: Express = express();

booking.put('/booking', (req: Request<unknown, unknown, Booking, unknown>, res: Response) => {
    (async () => {
        try {
            const booking: Booking = req.body;
            addBookingToQueue(booking);   
        } catch (e) {
            res.status(500).json("queue booking error: " + e.message);
        }
    })();
});