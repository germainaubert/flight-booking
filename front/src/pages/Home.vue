<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Flight } from '../../../contract/index';
import { useRouter } from 'vue-router';

const getFlights = async () => {
  const response = await fetch('http://localhost:3000/flights');
  return response.json();
};

const router = useRouter();
const flights = ref<Flight[]>([]);

const onClick = (flight: Flight) => {
  router.push({ path: 'booking', query: { ...flight } });
};

// not onmounted ?
watchEffect(async () => {
  flights.value = await getFlights();
});
</script>

<template>
  <div class="flex flex-col">
    <header class="text-center">
      <h1 class="text-4xl font-bold">Flight booking</h1>
    </header>
    <span>Choisissez un vol</span>
    <div v-if="flights.length === 0">Loading...</div>
    <div v-else>
      <div v-for="flight in flights" :key="flight.id">
        <div class="flex flex-row border-2 border-gray-200 p-2 space-x-2 justify-between">
          <div class="flex flex-col">
            <span> Départ : {{ flight.depart }}</span>
            <span> Arrivée : {{ flight.arrival }}</span>
          </div>
          <div class="flex flex-col">
            <span>Prix du vol: {{ flight.price }}€</span>
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
