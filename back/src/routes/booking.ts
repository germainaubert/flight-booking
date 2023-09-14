import express from 'express'
import { uuid } from 'uuidv4';
import fs from 'fs'

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

  res.json(result);
})

booking.post('/', (req, res) => {

  const reservation = req.body

  reservation.id = uuid()

  let bookings: any = fs.readFileSync('./data/booking.json');
  bookings = JSON.parse(bookings);
  bookings.push(reservation);

  let flights: any = fs.readFileSync('./data/flights.json');
  flights = JSON.parse(flights);
  flights = flights.map((flight: any) => {
    if (flight.id === reservation.flightId) {
      flight.remainingSeats -= 1;
    }

    return flight;
  });

  fs.writeFileSync('./data/flights.json', JSON.stringify(flights));
  fs.writeFileSync('./data/booking.json', JSON.stringify(bookings));
  res.json(reservation);
})

