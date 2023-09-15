import { convertCurrency } from '../services/convertor';
import { handledError, Currency, FlightBooking, Date } from '../contract';
import { getCurrency } from '../services/flights';
import express, { Express, Response, Request } from 'express'
import fs from 'fs'
import { Flight, Booking } from '../../../contract'

export const flights: Express = express();

flights.get('/', (req: Request<unknown, unknown, unknown, Currency>, res: Response) => {
	const test = getCurrency(req.query.currency);
	res.json(test);
})

flights.get('/bookingId', (req: Request<unknown, unknown, unknown, FlightBooking>, res: Response) => {
  const bookingId = req.query.id;

  let json: string = fs.readFileSync('./data/booking.json', 'utf-8');
  const bookings: Booking[] = JSON.parse(json);

  let id: string | null = null

  bookings.forEach((booking) => {
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
			flight.price = convertCurrency(req.query.currency, flight.price);
      result = flight
    }
  })
  if (result == null) throw new handledError(404, "Flight not found");

  res.json(result);
})

flights.get('/date', (req: Request<unknown, unknown, unknown, Date>, res: Response) => {
  const date: string = req.query.date;
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

