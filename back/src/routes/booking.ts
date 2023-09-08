import express from 'express'
import fs from 'fs'

export const booking = express()

booking.post('/', (req, res) => {

  const reservation = req.body

  let json: any = fs.readFileSync('./data/booking.json');
  let bookings = JSON.parse(json);

  bookings.push(reservation);
  fs.writeFileSync('./data/booking.json', JSON.stringify(bookings));
  res.json(reservation)
})