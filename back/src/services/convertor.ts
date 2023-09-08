import axios from 'axios';
import fs from 'fs';

const url: string = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
const maxAttempt = 5;

function fetchConversionData (attempt: number): void {
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

function handleResponse(data: string) {
    const currencies = parseData(data);
    if(currencies) {
        writeConversionJSON(currencies);
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

function writeConversionJSON(currencies: Object[]): void {
    fs.writeFile('./data/conversions.json', JSON.stringify(currencies), (e) => {
        if(e) {
            console.log("Unable to write conversion file");
            console.log(e);
        } else {
            console.log('File has been saved');

        }
    });
}

export default fetchConversionData;