import express, {Express, Request, Response} from 'express';
import { FlightBooking, FlightList, Booking } from '../../contract';

export const front: Express = express();

const flightEngineUrl = 'localhost:3004';
const bookingEngineUrl = 'localhost:3003'

front.get('/flightlist', (req: Request<unknown, unknown, unknown, FlightList>, res: Response) => {
    (async () => {
        const response = await fetch(flightEngineUrl + '/flightlist/?currency=' + req.query.currency);
        res.json(response);
    })();
});

front.get('/booking', (req: Request<unknown, unknown, unknown, FlightBooking>, res: Response) => {
    const bookingId = req.query.id;
    const currency = req.query.id;

    console.log(bookingId);
    console.log(currency);
});

front.post('/booking', (req: Request<unknown, unknown, Booking, unknown>, res: Response) => {
    const booking: Booking = req.body;
});