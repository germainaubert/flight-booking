import express, { Express, Response, Request } from 'express';
import fs from 'fs'
import { handledError, Id, Date } from '../contract';
import { Flight, Booking } from '../../../contract'

export const flights: Express = express()

flights.get('/', (req: Request, res: Response) => {
  const json: string = fs.readFileSync('./data/flights.json', 'utf-8');
  const flights: Flight[] = JSON.parse(json);
  res.json(flights)
})

flights.get('/bookingId', (req: Request<unknown, unknown, unknown, Id>, res: Response) => {
  const bookingId: string = req.query.id

  let json: string = fs.readFileSync('./data/booking.json', 'utf-8');
  const Bookings: Booking[] = JSON.parse(json);

  let id: string | null = null

  Bookings.forEach((booking) => {
    if (booking.id === bookingId) {
      id = booking.flightId
    }
  })
  if (id == null) throw new handledError(404, "Booking id not found");

  json = fs.readFileSync('./data/flights.json', 'utf-8');
  const flights: Flight[] = JSON.parse(json);

  let result: Flight | null = null

  flights.forEach((flight: any) => {
    if (flight.id === id) {
      result = flight
    }
  })
  if (result == null) throw new handledError(404, "Flight not found");

  res.json(result);
})

flights.get('/date', (req: Request<unknown, unknown, unknown, Date>, res: Response) => {
  const date: string = req.query.date
  const json: string = fs.readFileSync('./data/flights.json', 'utf-8');
  const jsonData: Flight[] = JSON.parse(json);
  const flights: Flight[] = []

  jsonData.forEach((flight) => {
    if (flight.date === date) {
      flights.push(flight)
    }

  });
  res.json(flights)
})

