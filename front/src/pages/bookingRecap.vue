<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Flight, Booking } from "../../../contract";
import { applyReduction } from "../helpers";

const route = useRoute();
const bookingId = route.query.id;
const flight = ref<Flight>();
const booking = ref<Booking>();
const currency  = localStorage.currency;
onMounted(async () => {
  booking.value = await getBooking();
  flight.value = await getFlightByBookingId();
});

const getBooking = async () => {
  const response = await fetch(
    "http://localhost:3000/booking/id/?id=" + bookingId
  );
  return response.json();
};

const getFlightByBookingId = async () => {
  const response = await fetch(
    "http://localhost:3000/flights/bookingId/?id=" +
      bookingId +
      "&currency=" +
      localStorage.currency
  );
  return response.json();
};
</script>

<template>
  <div v-if="flight && booking">
    <div
      class="mx-auto max-w-xl rounded-md shadow-md mt-16 border border-gray-300"
    >
      <div class="flex flex-col space-y-2 p-2">
        <div class="text-xl font-bold">Your booking n°{{ booking.id }}</div>
        <div class="border-b border-gray-300 px-4"></div>
        <!-- booking user infos -->
    <div class="bg-white bg-opacity-30 px-2 rounded-lg pb-2">
          <div class="text-xl font-bold">Your informations</div>
          <!-- avatar -->
          <div class="flex flex-row items-center space-x-2">
            <img
              class="w-12 h-12 rounded-full bg-gray-300"
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            />
            <div class="flex flex-col">
              <div class="text-lg font-bold">
                {{ booking?.firstname }} {{ booking?.lastname }}
              </div>
              <div class="text-sm text-gray-500">
                {{ booking?.email }}
              </div>
            </div>
          </div>
        </div>   <!-- separator -->
        <!-- separator -->
        <div class="border-b border-gray-300 pb-2"></div>
        <div class="grid grid-cols-2 gap-1 py-4">
          <dl class="gap-x-6 text-sm bg-gray-100 p-2 rounded-lg">
            <dt class="font-medium text-gray-900">Departure</dt>
            <dd class="mt-3 text-gray-500 text-xl">
              {{ flight?.route[0] }}
            </dd>
          </dl>
          <dl class="gap-x-6 text-sm bg-gray-100 p-2 rounded-lg">
            <dt class="font-medium text-gray-900">Arrival</dt>
            <dd class="mt-3 text-gray-500 text-xl">
              {{ flight?.route[flight?.route.length - 1] }}
            </dd>
          </dl>
          <!-- vege -->
          <dl class="gap-x-6 text-sm bg-gray-100 p-2 rounded-lg">
            <dt class="font-medium text-gray-900">Vegetarian</dt>
            <dd class="mt-3 text-gray-500 text-xl">
              <div v-if="booking?.vege">
                <svg
                  class="w-6 h-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div v-else>
                <svg
                  class="w-6 h-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
            </dd>
          </dl>
          <!-- price -->
          <dl class="gap-x-6 text-sm bg-gray-100 p-2 rounded-lg">
            <dt class="font-medium text-gray-900">Price</dt>
            <dd class="mt-3 text-gray-500 text-xl"> {{ applyReduction(flight, 0.1, NO_VEGE_ROUTE) }} {{currency }}</dd>
          </dl>
        </div>
       
        <!-- back button -->
        <div class="flex justify-end">
          <div>
            <router-link to="/">
              <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
              >
                Back
              </button>
            </router-link>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
