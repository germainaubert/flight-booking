import { Response, Request } from 'express';
import { Booking, Conversion, handledError } from "../../contract";
import { databaseAccesUrl } from "../const"

export const getBookingById = async (req: Request, res: Response) => {
  const id = req.query.id
  const currency = req.query.currency


  const bookingResponse = await fetch(databaseAccesUrl + '/booking/id/?id=' + id)

  if (!bookingResponse.ok) {
    const resJson = await bookingResponse.json()
    console.log(resJson)
    return Promise.reject(new handledError(resJson.code, resJson.message));
    throw new handledError(resJson.code, resJson.message)

  }
  const booking: Booking = (await bookingResponse.json()) as Booking

  const conversionResponse = await fetch(databaseAccesUrl + '/conversion/')
  const conversion: Conversion = (await conversionResponse.json()) as Conversion

  console.log(conversion)
  res.json('result')
}