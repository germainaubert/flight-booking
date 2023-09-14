export class handledError {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
}

export type FlightList = {
    currency: string;
}

export type FlightBooking = {
    id: string;
    currency: string;
}