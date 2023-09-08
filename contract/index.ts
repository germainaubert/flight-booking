export class Flight {
    id: string;
    route: string[];
    price: number;
    seats: number;
    remainingSeats: number;
}
export class Booking {
    firstname: string;
    lastname: string;
    email: string;
    flightId: string;
}