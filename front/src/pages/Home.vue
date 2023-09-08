<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Flight } from '../../../contract/index';
import { useRouter } from 'vue-router';

const ROUTE = "CDG-DTW-JFK";
const NO_VEGE_ROUTE = "DTW-JFK";

onMounted(async () => {
  flights.value = await getFlights();
  menuVege.value = flights.value.map(flight => ({ id: flight.id, vege: false }));
});

const getFlights = async () => {
  const response = await fetch('http://localhost:3000/flights');
  return response.json();
};

const applyReduction = (flight: Flight, reduction: number, route: string): number => {
  if (concatenateArray(flight.route) === route) {
    return Math.round(flight.price - (flight.price * reduction));
  }

  return flight.price;
}

const concatenateArray = (array: string[]): string => {
  return array.join("-");
}

type menuVege = { id: string, vege: boolean };

const router = useRouter();
const date = ref();
const flights = ref<Flight[]>([]);
const menuVege = ref<menuVege[]>([]);


const onClick = (flight: Flight) => {
  router.push({ path: 'booking', query: { ...flight } });
};

const getFlightsByDate = async () => {
  if (date.value) {
    const response = await fetch('http://localhost:3000/flights/date/?date=' + date.value);
    flights.value = await response.json();
  } else {
    flights.value = await getFlights();
  }
};

const getMenuVegeByFlightId = (flightId: string): menuVege => {
  return menuVege.value.find(value => value.id === flightId)!;
}

const updateVegeMenuOption = (flightId: string) => {
  const index = menuVege.value.findIndex(menu => menu.id === flightId);
  menuVege.value[index].vege = !menuVege.value[index].vege;
}
</script>

<template>
  <div class="flex flex-col">
    <header class="text-center flex flex-row justify-evenly">
      <div class="flex-1"></div>
      <div class="flex-1"><h1 class="text-4xl font-bold">Flight booking</h1></div>
      <div class="flex-1">
        <input type="date" v-model="date" @change="getFlightsByDate" />
      </div>
    </header>
    <span>Choisissez un vol</span>
    <div v-if="flights.length === 0">Loading...</div>
    <div v-else>
      <div v-for="flight in flights" :key="flight.id">
        <div class="flex flex-row border-2 border-gray-200 p-2 space-x-2 justify-between">
          <div class="flex flex-col">
            <span> Départ : {{ flight?.route?.[0] }}</span>
            <span v-if="flight?.route?.length >= 3"> Escales : {{ flight?.route?.slice(1, -1).join("-") }}</span>
            <span> Arrivée : {{ flight?.route?.[flight.route.length - 1] }}</span>
          </div>
          <div class="flex flex-col">
            <span>Prix du vol: {{ applyReduction(flight, 0.1, ROUTE) }}€</span>
            <span v-if="concatenateArray(flight.route) !== NO_VEGE_ROUTE">Option végétarien: <input type="checkbox" :value="getMenuVegeByFlightId(flight.id)" @change="updateVegeMenuOption(flight.id)" /></span>
          </div>
          <div v-if="flight.remainingSeats">
            <button
              @click="onClick(flight)"
              class="border-2 border-gray-200 p-4 text-white bg-red-500 rounded shadow-lg"
            >
              Select
            </button>
          </div>
          <div v-else>complet</div>
        </div>
      </div>
    </div>
  </div>
</template>
