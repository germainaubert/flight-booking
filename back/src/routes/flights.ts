import express from 'express'
import fs from 'fs'

export const flights = express()

flights.get('/', (req, res) => {
  let json: any = fs.readFileSync('./data/flights.json');
  let flights = JSON.parse(json);
  res.json(flights)
})

