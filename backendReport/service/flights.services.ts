import { Response, Request } from 'express';
import { Flight } from "../../contract";
import { databaseAccesUrl } from "../const"

export const getAllFlights = async (req: Request, res: Response) => {
    const response = await fetch(databaseAccesUrl + '/flight')
    const result: Flight[] = (await response.json()) as Flight[]

    res.json(result)
}

export const getFlightsByBookingId = async (req: Request, res: Response) => {
    const bookingId = req.query.id;

    const response = await fetch(databaseAccesUrl + '/flight/?id=' + bookingId)
    console.log(await response.text())
    const result: Flight = (await response.json()) as Flight

    res.json(result)
}
export const getFlightsById = async (req: Request, res: Response) => {
    const flightId = req.query.id;
    const response = await fetch(databaseAccesUrl + '/flight/id?id=' + flightId)
    const result: Flight[] = (await response.json()) as Flight[]

    res.json(result)
}
