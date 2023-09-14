<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Flight } from '../../../contract/index';
import { useRouter } from 'vue-router';
import { applyReduction, concatenateArray } from '../helpers';
import { ROUTE, NO_VEGE_ROUTE } from '../const';

onMounted(async () => {
  flights.value = await getFlights();
  currencies.value = await getCurrencies();
  console.log(flights)
  menuVege.value = flights.value.map((flight) => ({ id: flight.id, vege: false }));
});

const getFlights = async () => {
  try {
		const response = await fetch('http://localhost:3000/flights');
  	return response.json();
  } catch(e) {
		console.log(e);
	}
  
};

const getCurrencies = async () => {
    try {
        const res = await fetch('http://localhost:3000/conversion');
        return res.json();
    } catch(e) {
        console.log(e);
    }
} 

type menuVege = { id: string; vege: boolean };
const router = useRouter();
const date = ref();
const bookingSearch = ref();
const flights = ref<Flight[]>([]);
const currencies = ref<string[]>([]);
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
  return menuVege.value.find((value) => value.id === flightId)!;
};

const updateVegeMenuOption = (flightId: string) => {
  const index = menuVege.value.findIndex((menu) => menu.id === flightId);
  menuVege.value[index].vege = !menuVege.value[index].vege;
};
const searchBooking = () => {
  router.push({ path: 'recap', query: { id: bookingSearch.value } });
};
</script>

<template>
  <div class="flex flex-col">
    <header class="text-center flex flex-row justify-evenly h-12">
      <div class="flex justify-evenly flex-1">
        <input
          type="text"
          v-model="bookingSearch"
          placeholder="Booking id"
          class="border-2 border-grey-200 p-2"
        />

        <button
          @click="searchBooking"
          class="border-2 border-gray-200 px-2 text-white bg-red-500 rounded shadow-lg"
        >
          Search
        </button>
      </div>
      <div class="flex justify-evenly flex-1">
        <h1 class="text-4xl font-bold">Flight booking</h1>
      </div>
      <div class="flex justify-evenly flex-1">
        <input type="date" v-model="date" @change="getFlightsByDate" />
      </div>
    </header>
    <div v-if="flights.length === 0">Loading...</div>
    <div v-else>
      <div v-for="flight in flights" :key="flight.id">
        <div class="flex flex-row border-2 border-gray-200 p-2 space-x-2 justify-between">
          <div class="flex flex-col">
            <span> Départ : {{ flight?.route?.[0] }}</span>
            <span v-if="flight?.route?.length >= 3">
              Escales : {{ flight?.route?.slice(1, -1).join('-') }}</span
            >
            <span> Arrivée : {{ flight?.route?.[flight.route.length - 1] }}</span>
          </div>
          <div class="flex flex-col">
            <span>Prix du vol: {{ applyReduction(flight, 0.1, ROUTE) }}€</span>
            <span v-if="concatenateArray(flight.route) !== NO_VEGE_ROUTE"
              >Option végétarien:
              <input
                type="checkbox"
                :value="getMenuVegeByFlightId(flight.id)"
                @change="updateVegeMenuOption(flight.id)"
            /></span>
          </div>
          <div class="flex flex-col">
            <span>Places restantes: {{ flight.remainingSeats }}</span>
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
