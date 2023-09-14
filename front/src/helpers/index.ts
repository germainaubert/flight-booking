import { Flight } from '../../../contract/index';

export const applyReduction = (flight: Flight, reduction: number, route: string): number => {
  console.log('applyReduction', flight, reduction, route);
  if (concatenateArray(flight.route) === route) {
    return Math.round(flight.price - flight.price * reduction);
  }

  return flight.price;
};
export const concatenateArray = (array: string[]): string => {
  return array.join('-');
};

export const translateBoolean = (boolean: boolean): string => {
  return boolean ? 'Oui' : 'Non';
}
