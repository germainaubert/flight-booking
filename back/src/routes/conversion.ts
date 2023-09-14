import express from 'express';
import fs from 'fs';

export const conversion = express();

conversion.get('/', (req, res) => {
    const currencies = new Array("EUR");
    fs.readFile('./data/conversions.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const json = JSON.parse(data);
        for(const currency of json) {
            currencies.push(currency.currency)
        }
        res.json(currencies);
    });
})