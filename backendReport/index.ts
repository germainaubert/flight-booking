import express from 'express'
import bodyParser from 'body-parser'
import { handledError } from '../contract'
import { getBookingById } from './service/booking.services'
import { getAllFlights, getFlightsByBookingId } from './service/flights.services'

const app = express()
const port = 3004
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())

app.get('/booking/id', getBookingById)
app.get('/flight/bookingId', getFlightsByBookingId)
app.get('/flight', getAllFlights)

//ROUTE TEST
app.use('/test', (req, res, next) => {
    res.send('TEST BACKEND REPORT OK')
})

//MIDDLEWARE GESTION ERREUR
app.use((err: any, req: any, res: any, next: any) => {
    const handledError: handledError = err
    res.status(handledError.code).send(handledError.message)
})

app.listen(port, () => {
    console.log(`Internal API listening on port ${port}`)
})
