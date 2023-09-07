<script setup lang="ts">
import Form from "./Form.vue";
import { ref, watchEffect } from "vue";
import { Flight } from "../../../contract/index";
const flightSelected = ref<Flight | null>(null);
const getFlights = async () => {
  const response = await fetch("http://localhost:3000/flights");
  return response.json();
};
const flights = ref<Flight[]>([]);
const onClick = (flight: Flight) => {
  flightSelected.value = flight;
};

watchEffect(async () => {
  flights.value = await getFlights();
});
</script>

<template>
  <div class="flex flex-col">
    <span>Choisissez un vol</span>
    <div v-if="flights.length === 0">Loading...</div>
    <div v-else>
      <div v-for="flight in flights" :key="flight.id">
        <div class="flex flex-row border-2 border-gray-200 p-2 space-x-2">
          <div class="flex flex-col">
            <span> Départ : {{ flight.depart }}</span>
            <span> Arrivée : {{ flight.arrival }}</span>
          </div>
          <button @click="onClick(flight)" class="border-2 border-gray-200 p-2">
            Select
          </button>
        </div>
      </div>
    </div>
    <div v-if="flightSelected">
          <Form :flightSelected="flightSelected" />
        </div>
  </div>
</template>
