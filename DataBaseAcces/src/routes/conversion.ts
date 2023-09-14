import express, { Express, Response, Request } from 'express';
import fs from 'fs';
import { Conversion } from '../../../contract'

export const conversion: Express = express();

conversion.get('/', (req: Request, res: Response) => {
    let json: string = fs.readFileSync('./data/conversions.json', 'utf-8');
    let conversions: Conversion[] = JSON.parse(json);

    res.json(conversions);
})

conversion.post('/', (req: Request<unknown, unknown, Conversion[], unknown>, res: Response) => {
    const reservation: Conversion[] = req.body

    fs.writeFileSync('./data/conversions.json', JSON.stringify(reservation));
    res.json(reservation);
})