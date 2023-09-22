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
  /* if (flightResponseData.convertedPrice)
     bookingPrice = flightResponseData.convertedPrice[currency]
 */
  console.log(flightResponseData, 'flightResponseData')
  let booking: Booking = {
    id,
    flightId,
    currency,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    vege: (typeof req.body.vege === 'boolean' ? req.body.vege : false),
    price: bookingPrice,
    status: flightResponseData.company === "Temps Partiel" ? "confirmed" : "pending"
  }

  if (flightResponseData.remainingSeats === 0) throw new handledError(404, "Flight is complete");
  if (!flightResponseData.menuVege && booking.vege) throw new handledError(404, "Vegetarian menu not available on this flight");


  const postBookingResponse = await fetch(databaseAccesUrl + '/booking', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking)
  })


  const putRemainingSeatResponse = await fetch(databaseAccesUrl + '/flight/remainingSeats', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idFlight: flightId,
      seatToSubtract: 1,
    })
  })

  if (!postBookingResponse.ok) {
    const resJson = await postBookingResponse.json()
    throw new handledError(resJson.code, resJson.message)
  }

  res.json({ id })
}

export const getBookingById = async (req: Request, res: Response) => {
  const id = req.query.id
  const getBookingByIdResponse = await fetch(databaseAccesUrl + '/booking/id/?id=' + id)
  const getBookingByIdResponseData: Booking = (await getBookingByIdResponse.json()) as Booking
  if (getBookingByIdResponseData == null) throw new handledError(404, "Booking id not found");
  res.json(getBookingByIdResponseData);
}