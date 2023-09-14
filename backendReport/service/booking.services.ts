import { Response, Request } from 'express';
import { Booking } from "../../contract";
import { databaseAccesUrl } from "../const"

export const getBookingById = async (req: Request, res: Response) => {
  const id = req.query.id
  const response = await fetch(databaseAccesUrl + '/booking/id/?id=' + id)
  const result: Booking = (await response.json()) as Booking

  res.json(result)
}