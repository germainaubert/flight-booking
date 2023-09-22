import { Booking, Flight } from "../../../contract";
import { Request, Response } from "express";

const remoteIp = "http://10.8.110.189:8080/api/v1/";

export const getFlightsForInternal = async function (
  req: Request,
  res: Response
): Promise<void> {
  const response = await fetch(remoteIp + "flights", {
    method: "GET",
    headers: {
      "K4-API-KEY": "O2cv1Y1zMfMSBr_mmdq5Ktjz_46RV6pt",
    },
  });
  const data = await response.json();

  const flights: Flight[] = new Array();
  if (data) {
    for (const row of data) {
      flights.push(await convertFlight(row));
    }
  }
  console.log("flights", flights);
  res.json(flights);
};

const convertFlight = async function (externalFlight: any): Promise<Flight> {
  return {
    id: externalFlight.id,
    route: getRoute(externalFlight),
    date: "",
    price: externalFlight.price,
    seats: externalFlight.seats,
    remainingSeats: await getRemainingSeats(externalFlight.id),
    menuVege: false,
    company: "Temps Partiel",
  } as Flight;
};

function getRoute(externalFlightDTO: any): string[] {
  const route = [externalFlightDTO.airport_departiture.code]
    .concat(externalFlightDTO.stopover)
    .concat(externalFlightDTO.airport_destination.code);
  return route;
}

// to change, return a number, might be a string
async function getRemainingSeats(flightId: string): Promise<number> {
  const res = await fetch(remoteIp + "flights/" + flightId + "/getRestPlace", {
    method: "GET",
    headers: {
      "K4-API-KEY": "O2cv1Y1zMfMSBr_mmdq5Ktjz_46RV6pt",
    },
  });
  return await res.json();
}

export const getBookingBydIdForInternal = async function (
  req: Request,
  res: Response
): Promise<void> {
  const bookingId = req.query.id;
  const response = await fetch(remoteIp + "/external/flight");
  const data = await response.json();
  const booking: Booking = convertBooking(data);
  res.json(booking);
};

function convertBooking(data: any): Booking {
  console.log(data);
  return {} as Booking;
}
