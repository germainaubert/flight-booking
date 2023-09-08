import express from 'express'
import fs from 'fs'

export const booking = express()

booking.post('/', (req, res) => {

  const reservation = req.body

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