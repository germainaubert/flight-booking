import { readFile } from "../tool";
import { Flight } from "../../../contract/index";
import { convertCurrency } from "./convertor";

const filePath = './data/flights.json';

export function getCurrency(currency: string) {
    const flightsJSON = readFile(filePath);
    if(flightsJSON) {
        for(const flight of flightsJSON) {
            flight.price = convertCurrency(currency, flight.price);
        }
    }
    return flightsJSON;
}