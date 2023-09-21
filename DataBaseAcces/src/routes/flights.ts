import express, { Express, Response, Request } from 'express'
import fs from 'fs'
import { Flight, handledError, Currency, FlightBooking, Date, SubtractSeat } from '../../../contract'

export const flights: Express = express();

flights.get('/', (req: Request<unknown, unknown, unknown, Currency>, res: Response) => {
  let json: string = fs.readFileSync('./data/flights.json', 'utf-8');
  let flights: Flight[] = JSON.parse(json);

  res.json(flights);
})

flights.get('/id', (req: Request<unknown, unknown, unknown, FlightBooking>, res: Response) => {
  const id: string = req.query.id
  let result: Flight | null = null

  let json: string = fs.readFileSync('./data/flights.json', 'utf-8');
  let flights: Flight[] = JSON.parse(json);
  console.log('flights.ts: flights.get: flights: ', flights)
  flights.forEach((flight) => {
    if (flight.id === id) {
      result = flight
    }
  })

  if (result == null) throw new handledError(404, "Flight id not found");
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

flights.put('/remainingSeats', (req: Request<unknown, unknown, SubtractSeat, unknown>, res: Response) => {
  const seatToSubtract: SubtractSeat = req.body

  const json = fs.readFileSync('./data/flights.json', 'utf-8');
  const flights: Flight[] = JSON.parse(json);

  flights.forEach((flight) => {
    if (flight.id === seatToSubtract.idFlight) {
      flight.remainingSeats -= seatToSubtract.seatToSubtract;
    }
  })

  fs.writeFileSync('./data/flights.json', JSON.stringify(flights));
  res.json(seatToSubtract);
})

