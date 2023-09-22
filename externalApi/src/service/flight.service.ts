import { Request, Response } from "express";
import { backendReportUrl } from "../../../const"
import { Flight, handledError } from "../../../contract";

export const getAllFlight = async (req: Request, res: Response) => {
    const currency = req.query.currency
    const flightResponse = await fetch(backendReportUrl + '/flight/?currency=' + currency)

    if (!flightResponse.ok) {
        const resJson = await flightResponse.json()
        throw new handledError(resJson.code, resJson.message)
    }

    const flightResponseData: Flight[] = (await flightResponse.json()) as Flight[]
    res.json(flightResponseData)
}

export const getflightById = async (req: Request, res: Response) => {
    const currency = req.query.currency
    const id = req.query.id

    const flightResponse = await fetch(backendReportUrl + '/flight/id?id=' + id + '&currency=' + currency)

    if (!flightResponse.ok) {
        const resJson = await flightResponse.json()
        throw new handledError(resJson.code, resJson.message)
    }

    const flightResponseData: Flight = (await flightResponse.json()) as Flight
    res.json(flightResponseData)
}


export const getflightByBookingId = async (req: Request, res: Response) => {
    const currency = req.query.currency
    const id = req.query.id

    const flightResponse = await fetch(backendReportUrl + '/flight/bookingId?id=' + id + '&currency=' + currency)

    if (!flightResponse.ok) {
        const resJson = await flightResponse.json()
        throw new handledError(resJson.code, resJson.message)
    }

    const flightResponseData: Flight = (await flightResponse.json()) as Flight
    res.json(flightResponseData)
}