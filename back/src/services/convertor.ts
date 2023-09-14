import { handledError } from '../contract';
import { readFile, writeRecords } from '../tool';
import axios from 'axios';

const url: string = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
const filePath: string = './data/conversions.json';
const maxAttempt = 5;

export function fetchConversionData (attempt: number): void {
    attempt++;
    axios.get(url)
    .then(function (response) {
        handleResponse(response.data);
    })
    .catch(function (error) {
        console.log(error);
        if(attempt < maxAttempt) {
            console.log('Attempt n°'+attempt+' failed. Attempting in 5 minutes');
            setTimeout(() => fetchConversionData(attempt), 300000);    
        }
    })
}

export function convertCurrency(currency: string, valueToConvert: number): number {
    if(currency !== 'EUR') {
        const rate = getCurrencyRate(currency);
        if(rate) {
            valueToConvert *= rate;
        } else {
            throw new handledError(400, 'Unable to convert price from EUR to ' + currency);
        }
    }
    return valueToConvert;
}

function getCurrencyRate(currency: string): number | undefined {
    const fileContent = readFile(filePath);
    let returnCurrency;
    if(fileContent) {
        returnCurrency = fileContent.find((row: any) => row.currency === currency)
    }
    // if no result, set EUR as default
    if(!returnCurrency) {
        console.log('Unable to retrieve the rate of the following currency: ' + currency);
    }
    return returnCurrency.rate;
}

export function getSimpleCurrencyList() {
    const fileContent = readFile(filePath);
    const list = new Array('EUR');
    if(fileContent) {
        for(const currency of fileContent) {
            list.push(currency.currency);
        }
    }
    return list;
}

function handleResponse(data: string) {
    const currencies = parseData(data);
    if(currencies) {
        writeRecords(filePath, currencies);
    } else {
        console.log('Xml conversion object is empty');
    }
}

function parseData(responseData: string): Object[] {
    const currencies = [];
    for(const res of responseData.matchAll(/currency='(\w+)' rate='([\d+.]+)'/gm)) {
        currencies.push({currency: res[1], rate: parseFloat(res[2])});
    }
    return currencies;
}