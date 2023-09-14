import express, { Express, Response, Request } from 'express';
import { uuid } from 'uuidv4';
import fs from 'fs'
import { handledError, FlightBooking } from '../contract';
import { Flight, Booking } from '../../../contract'

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

  if (result == null) throw new handledError(404, "Booking id not found");
  res.json(result);
})

booking.post('/', (req: Request<unknown, unknown, Booking, unknown>, res: Response) => {
  const reservation: Booking = req.body
  reservation.id = uuid()

  let json: string = fs.readFileSync('./data/flights.json', 'utf-8');
  const flights: Flight[] = JSON.parse(json);

  for (const flight of flights) {
    if (flight.id === reservation.flightId) {
      if (flight.remainingSeats === 0) throw new handledError(404, "Flight is complete");
      if (!flight.menuVege && reservation.vege) throw new handledError(404, "Vegetarian menu not available on this flight");

      flight.remainingSeats -= 1;
    }
  }

  json = fs.readFileSync('./data/booking.json', 'utf-8');
  const bookings: Booking[] = JSON.parse(json);
  bookings.push(reservation);

  fs.writeFileSync('./data/flights.json', JSON.stringify(flights));
  fs.writeFileSync('./data/booking.json', JSON.stringify(bookings));
  res.json(reservation);
})

