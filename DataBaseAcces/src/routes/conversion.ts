import express from 'express';
import fs from 'fs';
import { getSimpleCurrencyList } from '../services/convertor';

export const conversion = express();

conversion.get('/', (req, res) => {
    res.json(getSimpleCurrencyList());
})