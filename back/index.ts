import express from 'express'
import { booking } from './src/routes/booking'
import { flights } from './src/routes/flights'
import { conversion } from './src/routes/conversion'
import fetchConversionData from './src/services/convertor'
import bodyParser from 'body-parser'

const app = express()
const port = 3000
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())
app.use('/booking', booking)
app.use('/flights', flights)
app.use('/conversion', conversion)

fetchConversionData(0);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

