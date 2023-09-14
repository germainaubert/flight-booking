export class Flight {
    id: string;
    route: string[];
    price: number;
    seats: number;
    remainingSeats: number;
    menuVege: boolean;
}
export class Booking {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    flightId: string;
    vege: boolean
}