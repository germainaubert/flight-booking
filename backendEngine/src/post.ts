import express, {Express, Request, Response} from 'express';
import { FlightList } from '../../contract';

export const front: Express = express();

const flightEngineUrl = 'localhost:3004';
const bookingEngineUrl = 'localhost:3003'

front.post('/booking', (req: Request<unknown, unknown, unknown, FlightList>, res: Response) => {
    
});

front.post('/', (req: Request<unknown, unknown, unknown, FlightList>, res: Response) => {
    
});