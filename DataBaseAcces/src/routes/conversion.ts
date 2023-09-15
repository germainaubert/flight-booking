import express, { Express, Response, Request } from 'express';
import fs from 'fs';
import { Conversion, Currency, handledError } from '../../../contract'

export const conversion: Express = express();

conversion.get('/list', (req: Request, res: Response) => {
    let json: string = fs.readFileSync('./data/conversions.json', 'utf-8');
    let conversions: Conversion[] = JSON.parse(json);

    res.json(conversions);
})

conversion.get('/rate', (req: Request<unknown, unknown, unknown, Currency>, res: Response) => {
    const currency = req.query.currency;
    let json: string = fs.readFileSync('./data/conversions.json', 'utf-8');
    let conversions: Conversion[] = JSON.parse(json);
    const found = conversions.find((row) => row.currency = currency);
    if(!found) {
        throw new handledError(400, "Unable to get currency rate of " + currency);
    }
    console.log(found);
    res.json(found);
})

conversion.post('/', (req: Request<unknown, unknown, Conversion[], unknown>, res: Response) => {
    console.log("post currencies")
    const reservation: Conversion[] = req.body

    fs.writeFileSync('./data/conversions.json', JSON.stringify(reservation));
    res.json(reservation);
})