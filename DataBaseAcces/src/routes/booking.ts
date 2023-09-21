import express, { Express, Response, Request } from 'express';
import fs from 'fs'
import { Booking, handledError, FlightBooking } from '../../../contract'

export const booking: Express = express()

booking.get('/id', (req: Request<unknown, unknown, unknown, FlightBooking>, res: Response) => {
  
  const id: string = req.query.id
  let result: Booking | null = null

  let json: string = fs.readFileSync('./data/booking.json', 'utf-8');

  let bookings: Booking[] = JSON.parse(json);

  bookings.forEach((booking: Booking) => {
    if (booking.id === id) {
      result = booking
    }
  })
  
  if (result === null) throw new handledError(404, "Booking id not found");
  res.status(200).json(result);
})

booking.post('/', (req: Request<unknown, unknown, Booking, unknown>, res: Response) => {
  const reservation: Booking = req.body
  const json = fs.readFileSync('./data/booking.json', 'utf-8');
  const bookings: Booking[] = JSON.parse(json);
  bookings.push(reservation);
  try {
    fs.writeFileSync('./data/booking.json', JSON.stringify(bookings));
  } catch (error : any) {
    throw new handledError(500, error.message);
  }
  res.send(JSON.stringify(reservation));
})

