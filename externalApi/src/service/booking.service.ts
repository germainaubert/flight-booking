import { Request, Response } from "express";
import { backendEngineUrl, backendReportUrl } from "../../../const"
import { Booking, Flight, handledError } from "../../../contract";

export const getBookingById = async (req: Request, res: Response) => {
    const currency = req.query.currency
    const id = req.query.id

    const bookingResponse = await fetch(backendReportUrl + '/booking/id?id=' + id)

    if (!bookingResponse.ok) {
        const resJson = await bookingResponse.json()
        throw new handledError(resJson.code, resJson.message)
    }

    const bookingResponseData: Booking = (await bookingResponse.json()) as Booking
    res.json(bookingResponseData)
}

export const postBooking = async (req: Request, res: Response) => {
    let booking: Booking = req.body
    console.log(booking)

    const bookingResponse = await fetch(backendEngineUrl + '/booking', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(booking)
    })

    if (!bookingResponse.ok) {
        const resJson = await bookingResponse.json()
        throw new handledError(resJson.code, resJson.message)
    }

    const bookingResponseData: Booking = (await bookingResponse.json()) as Booking
    res.json(bookingResponseData)
}