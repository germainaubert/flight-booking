import { Response, Request } from 'express';
import { Booking, Conversion, handledError } from "../../contract";
import { databaseAccesUrl } from "../../const"

export const getBookingById = async (req: Request, res: Response) => {
  const id = req.query.id

  const bookingResponse = await fetch(databaseAccesUrl + '/booking/id/?id=' + id)

  if (!bookingResponse.ok) {
    const resJson = await bookingResponse.json()
    return Promise.reject(new handledError(resJson.code, resJson.message));
  }
  const booking: Booking = (await bookingResponse.json()) as Booking

  res.json(booking)
}