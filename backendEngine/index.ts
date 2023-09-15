import express from 'express'
import bodyParser from 'body-parser'
import { handledError } from '../contract'
import { booking } from './route/booking.route'

const app = express()
const port = 3003
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())

app.use('/booking', booking)

//ROUTE HEALTH
app.use('/health', (req, res, next) => {
    res.send('Backend engine OK');
})

//MIDDLEWARE GESTION ERREUR
app.use((err: any, req: any, res: any, next: any) => {
    const handledError: handledError = err
    res.status(handledError.code).send(handledError.message)
})

app.listen(port, () => {
    console.log(`backendEngine API listening on port ${port}`)
})