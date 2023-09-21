import express from 'express'
import bodyParser from 'body-parser'
import { handledError } from '../contract'

const app = express()
const port = 3005
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())

app.use('/', (req, res, next) => {
    res.send('Queue')
})

//ROUTE HEALTH
app.use('/health', (req, res, next) => {
    res.send('Queue OK')
})

//MIDDLEWARE GESTION ERREUR
app.use((err: any, req: any, res: any, next: any) => {
    const handledError: handledError = err
    res.status(handledError.code).send(handledError.message)
})

app.listen(port, () => {
    console.log(`Queue listening on port ${port}`)
})
