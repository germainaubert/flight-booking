<script setup lang="ts">
import { Flight } from "../../../contract/index";
import { applyReduction, concatenateArray } from "../helpers";
import { ROUTE, NO_VEGE_ROUTE } from "../const";
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const flight = defineProps({
  flight: Flight,
});
const flightRef = ref<Flight>(flight.flight);
type menuVege = { id: string; vege: boolean };
const menuVege = ref<menuVege[]>([]);

const getMenuVegeByFlightId = (flightId: string): menuVege => {
  return menuVege.value.find((value) => value.id === flightId)!;
};

const updateVegeMenuOption = (flightId: string) => {
  const index = menuVege.value.findIndex((menu) => menu.id === flightId);
  menuVege.value[index].vege = !menuVege.value[index].vege;
};

const redirectBooking = (flight: Flight) => {
  router.push({ path: "booking", query: { ...flight } });
};
</script>

<template>
  <div
    v-if="flightRef"
    class="border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden"
  >
    <div class="grid grid-cols-5">
      <div
        class="col-span-1 bg-gradient-to-r from-red-800 to-red-500 opacity-90 blur-xs"
      ></div>
      <div
        class="col-span-4 p-2"
      >
        <div>
          <p class="text-sm text-gray-600 flex items-center justify-between">
            <div class="bg-gradient-to-r from-orange-500 to-yellow-500 text-white inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2">
              Vol n°{{ flightRef.id }}
            </div>  
            <div class="text-lg font-semibold text-gray-800">
             {{ flightRef?.route?.[0] }} - {{ flightRef?.route?.[flightRef.route.length - 1] }}
          </div>
          </p>
          
          <p class="text-gray-700 text-base" v-if="flightRef?.route?.length >= 3">
            Escales : {{ flightRef?.route?.slice(1, -1).join("-") }}
          </p>
        </div>
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <dl class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 lg:grid-cols-3">
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                <dt class="text-sm font-medium leading-6 text-gray-500">
                  Prix du vol
                </dt>
                <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                  {{ applyReduction(flightRef, 0.1, ROUTE) }}€
                </dd>
              </div>
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                <dt class="text-sm font-medium leading-6 text-gray-500">
                  Option végétarien
                </dt>
                <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                 <Switch v-model="menuVege" :class="[menuVege ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                  <span class="sr-only">Use setting</span>
                  <span aria-hidden="true" :class="[menuVege ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                </Switch>
                </dd>
                </div>
              
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">

                <dt class="text-sm font-medium leading-6 text-gray-500">
                  Places restantes
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
          <div v-else>complet</div>
        </div>
      </div>
    </div>
  </div>
</template>
