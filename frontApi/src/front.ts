import express, { Express, Request, Response } from 'express';
import { FlightBooking, FlightList, Booking } from '../../contract';

export const front: Express = express();

const flightEngineUrl = 'localhost:3004';
const bookingEngineUrl = 'localhost:3003'

front.get('/flight', (req: Request<unknown, unknown, unknown, FlightList>, res: Response) => {
    (async () => {
        try {
            const response = await fetch(flightEngineUrl + '/flight/?currency=' + req.query.currency);
            res.json(response);
        } catch (e) {
            res.status(500).json("front-api error: " + e.message);
        }
    })();
});

front.get('/booking', (req: Request<unknown, unknown, unknown, FlightBooking>, res: Response) => {
    (async () => {
        const currency = req.query.currency;
        const bookingId = req.query.id;
        const response = await fetch(bookingEngineUrl + '/booking/?currency=' + currency + '&id=' + bookingId);
        res.json(response);
    })();
});

front.post('/booking', (req: Request<unknown, unknown, Booking, unknown>, res: Response) => {
    const booking: Booking = req.body;
});