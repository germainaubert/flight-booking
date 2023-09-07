import express from 'express'
import { flights } from './routes/flights'
const app = express()
const port = 3000

app.use('/flights', flights)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})