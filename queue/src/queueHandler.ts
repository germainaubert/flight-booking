import { Booking } from "../../contract";

const queue = new Queue<Booking>();
//const interval = 120000; // == 2 min
const interval = 5000; // == 5 sec



export const addBookingToQueue= (booking: Booking) => {
    queue.enqueue(booking);
}

resolveQueue();

async function resolveQueue() {
    console.log('resolve');
    if(queue.size() !== 0 && await isExternalHealthy()) {
        while(queue.size()) {
            const booking: Booking = queue.getLastItemValue();
            if(await callCancelBooking(booking)) {
                queue.dequeue();
            }
        }
    }
    setTimeout(resolveQueue, interval);
}

async function callCancelBooking(booking: Booking): Promise<true | false> {
    const res = await fetch('http://127.0.0.1:3003/?id=' + booking.id);
    if(res.ok) {
        return true;
    } else {
        console.log('Queue is unable to cancel booking n°' + booking.id);
        return false;
    }
}

// get the health of the external api
async function isExternalHealthy(): Promise<boolean> {
    try {
        const res = await fetch('http://127.0.0.1:8080/healtCheck');
        return res.ok;
    } catch(error) {
        console.log(error);
        return false;
    }
}