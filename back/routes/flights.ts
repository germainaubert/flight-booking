import express from 'express'
export const flights = express()

flights.get('/', (req, res) => {
  res.send('flights')
})

