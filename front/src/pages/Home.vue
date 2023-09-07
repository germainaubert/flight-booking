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
        <header class="text-center">
            <h1 class="text-4xl font-bold">Flight booking</h1>
        </header>
        <div v-if="flightSelected">
            <Form :flightSelected="flightSelected" />
        </div>
        <div v-else>
            <span>Choisissez un vol</span>
            <div v-if="flights.length === 0">Loading...</div>
            <div v-else>
                <div v-for="flight in flights" :key="flight.id">
                    <div
                        class="flex flex-row border-2 border-gray-200 p-2 space-x-2 justify-between"
                    >
                        <div class="flex flex-col">
                            <span> Départ : {{ flight.depart }}</span>
                            <span> Arrivée : {{ flight.arrival }}</span>
                        </div>
                        <div class="flex flex-col">
                            <span>Prix du vol: {{ flight.price }}€</span>
                        </div>
                        <button
                            @click="onClick(flight)"
                            class="border-2 border-gray-200 p-4 text-white bg-red-500 rounded shadow-lg"
                        >
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
