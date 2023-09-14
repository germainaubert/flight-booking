import { convertCurrency } from '../services/convertor';
import { handledError, FlightList, FlightBooking } from '../contract';
import { getFlightList } from '../services/flights';
import express, { Express, Response, Request } from 'express'
import fs from 'fs'

export const flights: Express = express();

flights.get('/', (req: Request<unknown, unknown, unknown, FlightList>, res: Response) => {
	const test = getFlightList(req.query.currency);
	res.json(test);
})

flights.get('/bookingId', (req: Request<unknown, unknown, unknown, FlightBooking>, res: Response) => {
  const bookingId = req.query.id;

  let json: any = fs.readFileSync('./data/booking.json');
  let jsonData = JSON.parse(json);

  let id: any = null

  jsonData.forEach((booking: any) => {
    if (booking.id === bookingId) {
      id = booking.flightId
    }
  })
  if (id == null) throw new handledError(404, "Booking id not found");

  json = fs.readFileSync('./data/flights.json');
  jsonData = JSON.parse(json);

  let result = null

  jsonData.forEach((flight: any) => {
    if (flight.id === id) {
			flight.price = convertCurrency(req.query.currency, flight.price);
      result = flight
    }
  })

  res.json(result);
})

flights.get('/date', (req, res) => {
  const date = req.query.date
  const json: any = fs.readFileSync('./data/flights.json');
  const jsonData = JSON.parse(json);
  const flights: any = []

  jsonData.forEach((flight: any) => {
    if (flight.date === date) {
      flights.push(flight)
    }

  });
  res.json(flights)
})

