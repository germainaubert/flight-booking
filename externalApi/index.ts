import express from 'express'
import bodyParser from 'body-parser'
import { handledError } from '../contract'
import { externCall } from './route/externCall.route'

const app = express()
const port = 3001
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())

//MIDDLEWARE GESTION DES AUTHORISATIONS
app.use('/externCall',
    (req, res, next) => {
        if (req.headers['access-token'] != "0F549EZR9Z04OTG")
            throw new handledError(401, "Veuillez renseignez votre access token")
        next()
    },
    externCall
)

app.use('/internCall', (req, res, next) => {
    if (req.headers['access-token'] != "VERS24FLKJ76HY5GT4R")
        throw new handledError(401, "???")
    next()
})

//ROUTE helth
app.use('/health', (req, res, next) => {
    res.send('External api ok')
})

//MIDDLEWARE GESTION ERREUR
app.use((err: any, req: any, res: any, next: any) => {
    const handledError: handledError = err
    res.status(handledError.code).send({ code: handledError.code, message: handledError.message })
})

app.listen(port, () => {
    console.log(`External API listening on port ${port}`)
})
