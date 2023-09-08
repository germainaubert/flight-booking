import { Flight } from '../../../contract/index';

export const applyReduction = (flight: Flight, reduction: number, route: string): number => {
  if (concatenateArray(flight.route) === route) {
    return Math.round(flight.price - flight.price * reduction);
  }

  return flight.price;
};

export const concatenateArray = (array: string[]): string => {
  return array.join('-');
};