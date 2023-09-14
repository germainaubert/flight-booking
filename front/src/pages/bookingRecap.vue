<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { applyReduction } from '../helpers';
import { ROUTE } from '../const';

const route = useRoute();
const bookingId = route.query.id;
const flight = ref();

onMounted(async () => {
  flight.value = await getFlightByBookingId();
});

const getFlightByBookingId = async () => {
  const response = await fetch('http://localhost:3000/flights/bookingId/?id=' + bookingId);
  return response.json();
};
</script>

<template>
  <div>
    <div>
      <router-link to="/">Retour</router-link>
    </div>
    <div v-if="flight" class="flex flex-row border-2 border-gray-200 p-2 space-x-2 justify-between">
      <div class="flex flex-col">
        <span>id: {{ bookingId }}</span>
      </div>
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
    </div>
    <div v-else>Error booking id not found</div>
  </div>
</template>
