import express from 'express'
import bodyParser from 'body-parser'
import { front } from './src/front';
import { handledError } from '../contract'

const app = express()
const port = 3000
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())

app.use('/', front)

//MIDDLEWARE GESTION ERREUR
app.use((err: any, req: any, res: any, next: any) => {
    const handledError: handledError = err
    res.status(handledError.code).send(handledError.message)
})

app.listen(port, () => {
    console.log(`Internal API listening on port ${port}`)
})
