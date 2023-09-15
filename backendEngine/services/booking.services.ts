import { Response, Request } from 'express';
import { Booking, Conversion, Flight, handledError } from "../../contract";
import { backendReportUrl, databaseAccesUrl } from "../../const"
import { uuid } from 'uuidv4';

export const postBooking = async (req: Request, res: Response) => {
  const id: string = uuid()
  const flightId = req.body.flightId
  const currency = req.body.currency

  const flightResponse = await fetch(backendReportUrl + '/flight/id/?id=' + flightId + '&currency=' + currency)
  const flightResponseData: Flight = (await flightResponse.json()) as Flight

  let bookingPrice = flightResponseData.price;
  if (flightResponseData.convertedPrice)
    bookingPrice = flightResponseData.convertedPrice[currency]

  let booking: Booking = {
    id,
    flightId,
    currency,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    vege: (typeof req.body.vege === 'boolean' ? req.body.vege : false),
    price: bookingPrice
  }

  const postBookingResponse = await fetch(databaseAccesUrl + '/booking', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking)
  })

  if (!postBookingResponse.ok) {
    const resJson = await postBookingResponse.json()
    return Promise.reject(new handledError(resJson.code, resJson.message));
  }

  res.json({ id })
}