import express from 'express'
import bodyParser from 'body-parser'
import { handledError } from '../contract'
import { booking } from './route/booking.route'
import { flight } from './route/flight.route'

const app = express()
const port = 3004
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())

app.use('/booking', booking)
app.use('/flight', flight)

//ROUTE TEST
app.use('/test', (req, res, next) => {
    res.send('TEST BACKEND REPORT OK')
})

//MIDDLEWARE GESTION ERREUR
app.use((err: any, req: any, res: any, next: any) => {
    const handledError: handledError = err
    res.status(handledError.code).send({ code: handledError.code, message: handledError.message })
})

app.listen(port, () => {
    console.log(`backendReport API listening on port ${port}`)
})
