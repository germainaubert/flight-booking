import express from 'express'
import bodyParser from 'body-parser'
import { handledError } from '../contract'

export const launchExternalApi = () => {

    const app = express()
    const port = 3001
    const cors = require('cors')

    app.use(cors());
    app.use(bodyParser.json())

    //MIDDLEWARE GESTION DES AUTHORISATIONS
    app.use((req, res, next) => {
        console.log('auth dans header =>', req.headers)
        next()
    })


    //ROUTE TEST
    app.use('/test', (req, res, next) => {
        res.send('TEST EXTERNAL API OK')
    })

    //MIDDLEWARE GESTION ERREUR
    app.use((err: any, req: any, res: any, next: any) => {
        const handledError: handledError = err
        res.status(handledError.code).send(handledError.message)
    })

    app.listen(port, () => {
        console.log(`External API listening on port ${port}`)
    })
}
