<script setup lang="ts">
import Form from "./Form.vue";
import flights from "../../../flights.json";
import { ref } from "vue";
const flightSelected = ref(null);

const onClick = (flight) => {
  flightSelected.value = flight;
};
</script>

<template>
  <div class="flex flex-col">
    <span>Choisissez un vol</span>
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
      <div v-if="flightSelected">
        <Form :flightSelected="flightSelected" />
      </div>
    </div>
  </div>
</template>
