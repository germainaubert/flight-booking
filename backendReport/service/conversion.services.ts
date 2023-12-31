import { Response, Request } from 'express';
import { Conversion, Flight, handledError } from "../../contract";
import { databaseAccesUrl } from "../../const";

const getConversionDataAsObject = async () => {
    let conversionDataAsObject: any = {}

    const conversionResponse = await fetch(databaseAccesUrl + '/conversion/')
    if (!conversionResponse.ok) {
        const resJson = await conversionResponse.json()
        throw new handledError(resJson.code, resJson.message)
    }
    const conversion: Conversion[] = (await conversionResponse.json()) as Conversion[]

    conversion.forEach(element => {
        conversionDataAsObject[element.currency] = element.rate
    });
    return conversionDataAsObject
}

export const convertFlightCurrency = async (flight: Flight | Flight[], currency: string) => {

    const conversion = await getConversionDataAsObject()

    if (Array.isArray(flight)) {
        flight.forEach((flightElem: Flight) => {
            if (typeof conversion[currency] == 'number') {
                flightElem.price *= conversion[currency]
                /* flightElem.convertedPrice = {
                     [currency]: conversion[currency] * flightElem.price
                 }*/
            }
        })
    } else {
        if (typeof conversion[currency] == 'number') {
            flight.price *= conversion[currency]
            /* flight.convertedPrice = {
                 [currency]: conversion[currency] * flight.price
             }*/
        }
    }
    return flight
}

export const getCurrencyList = async (req: Request, res: Response) => {
    let currencyList: string[] = []

    const conversionResponse = await fetch(databaseAccesUrl + '/conversion/')
    if (!conversionResponse.ok) {
        const resJson = await conversionResponse.json()
        throw new handledError(resJson.code, resJson.message)
    }

    const conversion: Conversion[] = (await conversionResponse.json()) as Conversion[]

    conversion.forEach(element => {
        currencyList.push(element.currency)
    });

    res.json(currencyList)
}