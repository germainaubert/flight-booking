import express from 'express'
import bodyParser from 'body-parser'
import { booking } from './routes/booking'
import { flights } from './routes/flights'
const app = express()
const port = 3000
var cors = require('cors')

app.use(cors());
app.use(bodyParser.json())
app.use('/booking', booking)
app.use('/flights', flights)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})