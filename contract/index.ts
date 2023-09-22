export type Flight = {
    id: string;
    route: airport[];
    date: string
    price: number;
    seats: number;
    remainingSeats: number;
    menuVege: boolean;
    company: string;
    /*convertedPrice: {
        [key: string]: number
    }*/
}
export type Booking = {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    flightId: string;
    vege: boolean;
    price: number;
    currency: string;
    status: "pending" | "confirmed" | "canceled";
}

type airport = "CDG" | "JFK" | "DTW" | "LAD"

export class handledError {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
}

export type Currency = {
    currency: string;
}

export type FlightBooking = {
    id: string;
    currency: string;
    date?: string;
}

export type Date = {
    date: string;
}

export type SubtractSeat = {
    idFlight: string;
    seatToSubtract: number;
}

export type Conversion = {
    currency: string
    rate: number
}

export type Status = {
    frontApiStatus: boolean
    reportApiStatus: boolean
    dbApiStatus: boolean
    externalApiStatus: boolean
    backendEngineApiStatus: boolean
}