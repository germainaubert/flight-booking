import express from 'express'
import bodyParser from 'body-parser'
import { handledError } from '../contract'
import { booking } from './route/booking.route'
import { flight } from './route/flight.route'
import { currency } from './route/currency.route'

const app = express()
const port = 3004
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())

app.use('/booking', booking)
app.use('/flight', flight)
app.use('/currency', currency)

//ROUTE HEALTH
app.use('/health', (req, res, next) => {
    res.send('Backend report ok')
})

//MIDDLEWARE GESTION ERREUR
app.use((err: any, req: any, res: any, next: any) => {
    const handledError: handledError = err
})

app.listen(port, () => {
    console.log(`backendReport API listening on port ${port}`)
})
