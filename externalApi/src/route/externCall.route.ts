import express, { Express, Response, Request } from 'express';
import { getAllFlight, getflightByBookingId, getflightById } from '../service/flight.service';
import { getBookingById, postBooking } from '../service/booking.service';
import { Booking } from "../../../contract";

export const externCall: Express = express()

externCall.get('/flight', async (req, res, next) => {
    try {
        await getAllFlight(req, res)
    } catch (error) {
        next(error)
    }
})

externCall.get('/flight/id', async (req, res, next) => {
    try {
        await getflightById(req, res)
    } catch (error) {
        next(error)
    }
})

externCall.get('/flight/bookingId', async (req, res, next) => {
    try {
        await getflightByBookingId(req, res)
    } catch (error) {
        next(error)
    }
})

externCall.get('/booking/id', async (req, res, next) => {
    try {
        await getBookingById(req, res)
    } catch (error) {
        next(error)
    }
})

externCall.post('/booking', async (req, res, next) => {

    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    firstname: 'Test1',
                    lastname: 'Test2',
                    email: 'test@gmail.com',
                    flightId: '1',
                    price: 100,
                    currency: '',
                    vege: false
                }
        } */

    try {
        await postBooking(req, res)
    } catch (error) {
        next(error)
    }
})