import { handledError } from '../contract';
import express from 'express'
import fs from 'fs'

export const flights = express()

flights.get('/', (req, res) => {
  const json: any = fs.readFileSync('./data/flights.json');
  const flights = JSON.parse(json);
  res.json(flights)
})

flights.get('/bookingId', (req, res) => {
  const bookingId = req.query.id

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

