import { Request, Response } from "express";
import { backendReportUrl } from "../../const"
import { Booking, Flight, handledError } from "../../contract";


export const getBookingById = async (req: Request, res: Response) => {
    const currency = req.query.currency
    const id = req.query.id

    const flightResponse = await fetch(backendReportUrl + '/booking/id?id=' + id)

    if (!flightResponse.ok) {
        const resJson = await flightResponse.json()
        throw new handledError(resJson.code, resJson.message)
    }

    const flightResponseData: Booking = (await flightResponse.json()) as Booking
    res.json(flightResponseData)
}

