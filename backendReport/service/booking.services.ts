import { Response, Request } from 'express';
import fetch from 'node-fetch';
import { Booking } from "../../contract";

export const getBookingById = async (req: Request, res: Response) => {

  const id = req.query.id

  const response = await fetch('localhost:3002/booking/id/?id=' + id)
  const result: Booking = (await response.json()) as Booking

  res.json(result)
}