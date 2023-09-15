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
                flightElem.convertedPrice = {
                    [currency]: conversion[currency] * flightElem.price
                }
            }
        })
    } else {
        if (typeof conversion[currency] == 'number') {
            flight.convertedPrice = {
                [currency]: conversion[currency] * flight.price
            }
        }
    }

    return flight
}