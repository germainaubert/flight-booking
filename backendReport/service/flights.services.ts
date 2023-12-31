import { Response, Request } from "express";
import { Booking, Currency, Flight, handledError } from "../../contract";
import { databaseAccesUrl, externalUrl } from "../../const";
import { convertFlightCurrency } from "./conversion.services";

export const getAllFlights = async (
  req: Request<unknown, unknown, unknown, Currency>,
  res: Response
) => {
  const response = await fetch(
    databaseAccesUrl + "/flight/?" + req.query.currency
  );
  const responsefromOtherService = await fetch(
    (externalUrl + "/flight/?" + req.query.currency), 
    {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "access-token": "VERS24FLKJ76HY5GT4R",
      },
    }
  );

  const result: Flight[] = (await response.json()) as Flight[];
  console.log("result before push: ");
  if(responsefromOtherService.ok){
    const resultFromOtherService: Flight[] = (await responsefromOtherService.json()) as Flight[];
    result.push(...resultFromOtherService);
  }
  console.log("result after push: " + result);
  if (typeof req.query.currency == "string")
    await convertFlightCurrency(result, req.query.currency as string);
  res.json(result);
};

export const getFlightsById = async (req: Request, res: Response) => {
  const flightId = req.query.id;
  const response = await fetch(databaseAccesUrl + "/flight/id?id=" + flightId);
  const result: Flight[] = (await response.json()) as Flight[];

  if (typeof req.query.currency == "string")
    await convertFlightCurrency(result, req.query.currency as string);

  res.json(result);
};

export const getFlightsByBookingId = async (req: Request, res: Response) => {
  const bookingId = req.query.bookingId;
  const currency = req.query.currency;

  const bookingResponse = await fetch(
    databaseAccesUrl + "/booking/id?id=" + bookingId
  );
  //
  if (!bookingResponse.ok) {
    const resJson = await bookingResponse.json();
    throw new handledError(resJson.code, resJson.message);
  }

  const booking: Booking = (await bookingResponse.json()) as Booking;

  const flightResponse = await fetch(
    databaseAccesUrl + "/flight/id?id=" + booking.flightId
  );

  if (!flightResponse.ok) {
    const resJson = await flightResponse.json();
    throw new handledError(resJson.code, resJson.message);
  }
  const result: Flight[] = (await flightResponse.json()) as Flight[];

  if (typeof req.query.currency == "string")
    await convertFlightCurrency(result, req.query.currency as string);

  res.json(result);
};

export const getFlightsByDate = async (req: Request, res: Response) => {
  const date = req.query.date;
  const response = await fetch(databaseAccesUrl + "/flight/date?date=" + date);
  const result: Flight[] = (await response.json()) as Flight[];
  if (typeof req.query.currency == "string")
    await convertFlightCurrency(result, req.query.currency as string);

  res.json(result);
};
