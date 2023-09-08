
import express from 'express'
import fs from 'fs'

export const flights = express()

flights.get('/', (req, res) => {
  const json: any = fs.readFileSync('./data/flights.json');
  const flights = JSON.parse(json);
  res.json(flights)
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

