import express from 'express'
import { booking } from '../routes/booking'
import { flights } from '../routes/flights'
import { conversion } from '../routes/conversion'
import bodyParser from 'body-parser'
import { handledError } from '../contract'


export const launchInternalApi = () => {

    const app = express()
    const port = 3000
    const cors = require('cors')

    app.use(cors());
    app.use(bodyParser.json())

    app.use('/booking', booking)
    app.use('/flights', flights)
    app.use('/conversion', conversion)




    //ROUTE TEST
    app.use('/test', (req, res, next) => {
        res.send('TEST INTERNAL API OK')
    })

    //MIDDLEWARE GESTION ERREUR
    app.use((err: any, req: any, res: any, next: any) => {
        const handledError: handledError = err
        res.status(handledError.code).send(handledError.message)
    })

    app.listen(port, () => {
        console.log(`Internal API listening on port ${port}`)
    })

}
