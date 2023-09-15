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
}

export type Date = {
    date: string;
}