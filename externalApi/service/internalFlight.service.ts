import { Flight } from "../../contract";
import { Request, Response } from "express";

const remoteIp = '';

export const getFlightsForInternal = async function (req: Request, res: Response): Promise<void> {
    const response = await fetch(remoteIp + '/external/flight');
    const data = await response.json();
    const flights: Flight[] = new Array();
    for(const row of data) {
        flights.push(await convertFlight(row))
    }
    res.json(flights);
}

const convertFlight = async function (externalFlight: any): Promise<Flight> {
    return {
        id: externalFlight.flight_id,
        route: getRoute(externalFlight.flight),
        date: externalFlight.date_departiture,
        price: externalFlight.flight.price,
        seats: externalFlight.flight.seats,
        remainingSeats: await getRemainingSeats(externalFlight.flight.id),
        menuVege: false,
        company: 'les mecs du fond'
    } as Flight;
}

function getRoute(externalFlightDTO: any): string[] {
    const route = [externalFlightDTO.airport_departiture.code].concat(externalFlightDTO.stopover).concat(externalFlightDTO.airport_destination.code);
    return route;
}

// to change, return a number, might be a string 
async function getRemainingSeats(flightId: string): Promise<number> {
    const res = await fetch(remoteIp + '/remainingSeats/?id=' + flightId);
    return await res.json();
}