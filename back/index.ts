import express from 'express'
import bodyParser from 'body-parser'
import { booking } from './src/routes/booking'
import { flights } from './src/routes/flights'
import { fetchConversionData } from './src/services/convertor'

const app = express()
const port = 3000
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())
app.use('/booking', booking)
app.use('/flights', flights)

fetchConversionData();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

