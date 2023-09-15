import { Response, Request } from 'express';
import { Booking, Flight } from "../../contract";
import { databaseAccesUrl } from "../const"
import { convertFlightCurrency } from './conversion.services';

export const getAllFlights = async (req: Request, res: Response) => {

    const response = await fetch(databaseAccesUrl + '/flight');
    const result: Flight[] = (await response.json()) as Flight[]

    if (typeof req.query.currency == 'string')
        await convertFlightCurrency(result, req.query.currency as string)

    res.json(result)
}

export const getFlightsById = async (req: Request, res: Response) => {
    const flightId = req.query.id;
    const response = await fetch(databaseAccesUrl + '/flight/id?id=' + flightId)
    const result: Flight[] = (await response.json()) as Flight[]

    if (typeof req.query.currency == 'string')
        await convertFlightCurrency(result, req.query.currency as string)

    res.json(result)
}

export const getFlightsByBookingId = async (req: Request, res: Response) => {
    const bookingId = req.query.id;
    const currency = req.query.currency;


    const bookingResponse = await fetch(databaseAccesUrl + '/booking/id?id=' + bookingId);
    const booking: Booking = (await bookingResponse.json()) as Booking

    const flightResponse = await fetch(databaseAccesUrl + '/flight/id?id=' + booking.flightId);
    const result: Flight[] = (await flightResponse.json()) as Flight[]


    if (typeof req.query.currency == 'string')
        await convertFlightCurrency(result, req.query.currency as string)

    console.log(result)
    res.json(result)
}