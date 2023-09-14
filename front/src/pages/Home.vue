<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Flight } from '../../../contract/index';
import { useRouter } from 'vue-router';
import { applyReduction } from '../helpers';
import { ROUTE } from '../const';
import Header from '../component/Header.vue';

onMounted(async () => {
  flights.value = await getFlights();
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

type menuVege = { id: string; vege: boolean };
const router = useRouter();
const flights = ref<Flight[]>([]);
const menuVege = ref<menuVege[]>([]);

const onClick = (flight: Flight) => {
  router.push({ path: 'booking', query: { ...flight } });
};

const getFlightsByDate = async (date: string) => {
  if (date) {
    const response = await fetch('http://localhost:3000/flights/date/?date=' + date);
    flights.value = await response.json();
  } else {
    flights.value = await getFlights();
  }
};

const searchBooking = (bookingSearch: string) => {
  router.push({ path: 'recap', query: { id: bookingSearch } });
};
</script>

<template>
  <div class="flex flex-col">
    <Header @searchBooking="searchBooking" @getFlightsByDate="getFlightsByDate" />
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
