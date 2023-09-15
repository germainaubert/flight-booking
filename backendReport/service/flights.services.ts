import { Response, Request } from 'express';
import { Flight } from "../../contract";

export const getAllFlights = async (req: Request, res: Response) => {
    
    const response = await fetch('localhost:3002/flight/?currency=' + req.query.currency);
    const result: Flight[] = (await response.json()) as Flight[]

    res.json(result)
}


export const getFlightsByBookingId = async (req: Request, res: Response) => {
    const bookingId = req.query.id;

    const response = await fetch('localhost:3002/flight/bookingId?id=' + bookingId)
    const result: Flight = (await response.json()) as Flight

    res.json(result)
}