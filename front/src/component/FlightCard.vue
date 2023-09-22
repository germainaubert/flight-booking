<script setup lang="ts">
import { Flight } from "../../../contract/index";
import { applyReduction } from "../helpers";
import { ROUTE } from "../const";
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const flight = defineProps({
  flight: {
    type: Object as () => Flight,
    required: true,
  },
});
const currency  = localStorage.currency;  

const flightRef = ref<Flight>(flight.flight);
const redirectBooking = (flight: Flight) => {
  router.push({ path: "booking", query: { ...flight } });
};
</script>

<template>
  <div
    v-if="flightRef"
      
  >
    <div class="grid grid-cols-5 border-2 border-gray-300 rounded-md shadow-md overflow-hidden">
      <div
        class="col-span-1 bg-gradient-to-r from-red-800 to-red-500 opacity-90 blur-xs"
      >
        <div class="flex flex-col justify-between items-center space-y-4 p-16 h-full">
          <div class="text-white font-semibold self-start">
            {{ flightRef?.route[0] }}
          </div>
          <div class="flex flex-col items-center text-3xl text-white space-y-2">
            -
          </div>
          <div class="text-white font-semibold self-end">
            {{ flightRef?.route[flightRef?.route.length - 1] }}
          </div>
        </div>
    </div>
      <div
        class="col-span-4 p-2"
      >
        <div>
          <p class="text-sm text-gray-600 flex items-center justify-between">
            <div class="bg-gradient-to-r from-orange-500 to-yellow-500 text-white inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2">
              Fly n°{{ flightRef.id }}
            </div>  
          </p>
          
          <p class="text-gray-700 text-base" v-if="flightRef?.route?.length >= 3">
            Stops : {{ flightRef?.route?.slice(1, -1).join("-") }}
          </p>
        </div>
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <dl class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 lg:grid-cols-3">
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                <dt class="text-sm font-medium leading-6 text-gray-500">
                  Fly cost
                </dt>
                <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                  {{ applyReduction(flightRef, 0.1, ROUTE) }} {{ currency }}
                </dd>
              </div>
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                <dt class="text-sm font-medium leading-6 text-gray-500">
                  Vegetarian menu 
                </dt>
                <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                 <!-- if flightref.menuVege icon check or close -->
                 <div v-if="flightRef.menuVege" class="text-green-500 flex items-center space-x-2">
                  <svg
                    class="h-6 w-6 "
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      />
                  </svg>
                  <span class="text-sm">Included</span>
                </div>
                <div v-else class="text-red-500 flex items-center space-x-2">
                  <svg
                    class="h-6 w-6 "
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      />
                  </svg>
                  <span class="text-sm">Non Included</span>
                </div>
                </dd>
                </div>
              
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">

                <dt class="text-sm font-medium leading-6 text-gray-500">
                   Remaining seats
                </dt>

                <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                  {{ flightRef.remainingSeats }}
                </dd>

              </div>
              </dl>
          </div>
          </div>
        <div class="flex justify-end">
          <div v-if="flightRef.remainingSeats" >
            <div @click="redirectBooking(flightRef)">
              <button class="py-2 px-4 rounded border-2 border-gray-900 hover:bg-gray-100">
                Select
              </button>
              </div>
          </div>
          <div v-else>
            Full
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
