export type Flight = {
    id: string;
    route: airport[];
    date: string
    price: number;
    seats: number;
    remainingSeats: number;
    menuVege: boolean;
}
export type Booking = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    flightId: string;
    vege: boolean
}

type airport = "CDG" | "JFK" | "DTW"