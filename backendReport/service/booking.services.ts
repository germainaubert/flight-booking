import { Response, Request } from 'express';
import { Booking } from "../../contract";

export const getBookingById = async (req: Request, res: Response) => {
  console.log('getBookingById called')
  const id = req.query.id

  const response = await fetch('localhost:3002/booking/id/?id=' + id)
  const result: Booking = (await response.json()) as Booking

  res.json(result)
}