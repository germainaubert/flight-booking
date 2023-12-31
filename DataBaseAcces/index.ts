import express from 'express'
import { booking } from './src/routes/booking'
import { flights } from './src/routes/flights'
import { conversion } from './src/routes/conversion'
import bodyParser from 'body-parser'
import { handledError } from '../contract'

const app = express()
const port = 3002
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())

app.use('/booking', booking)
app.use('/flight', flights)
app.use('/conversion', conversion)

//ROUTE HEALTH
app.use('/health', (req, res, next) => {
    res.send('Database api OK')
})

app.use((err: any, req: any, res: any, next: any) => {//middleware de gestion d'erreur
  const handledError: handledError = err
  res.status(handledError.code).json({ code: handledError.code, message: handledError.message })
})

app.listen(port, () => {
  console.log(`Database Access API listening on port ${port}`)
})

