import { Request, Response } from "express";
import { backendReportUrl } from "../../const"
import { Flight, handledError } from "../../contract";


export const getAllFlight = async (req: Request, res: Response) => {
    const currency = req.query.currency

    const flightResponse = await fetch(backendReportUrl + '/flight/&currency=' + currency)

    if (!flightResponse.ok) {
        console.log(flightResponse)
        const resJson = await flightResponse.json()
        console.log('azeazeazedvfvpodk')
        throw new handledError(resJson.code, resJson.message)
    }

    const flightResponseData: Flight = (await flightResponse.json()) as Flight
    res.json(flightResponseData)
}