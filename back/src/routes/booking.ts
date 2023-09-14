import express from 'express'
import { uuid } from 'uuidv4';
import fs from 'fs'
import { handledError } from '../contract';

export const booking = express()

booking.get('/id', (req, res) => {

  const id = req.query.id
  let result = null

  let json: any = fs.readFileSync('./data/booking.json');
  let jsonData = JSON.parse(json);

  jsonData.forEach((booking: any) => {
    if (booking.id === id) {
      result = booking
    }
  })

  if (result == null) throw new handledError(404, "Booking id not found");
  res.json(result);
})

booking.post('/', (req, res) => {

  const reservation = req.body
  reservation.id = uuid()

  let flights: any = fs.readFileSync('./data/flights.json');
  flights = JSON.parse(flights);

  for (const flight of flights) {
    if (flight.id === reservation.flightId && flight.remainingSeats > 0) {
      flight.remainingSeats -= 1;
    }
    else if (flight.remainingSeats === 0) return null
  }

  let bookings: any = fs.readFileSync('./data/booking.json');
  bookings = JSON.parse(bookings);
  bookings.push(reservation);

  fs.writeFileSync('./data/flights.json', JSON.stringify(flights));
  fs.writeFileSync('./data/booking.json', JSON.stringify(bookings));
  res.json(reservation);
})

