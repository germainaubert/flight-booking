<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { Flight } from "../../../contract/index";
import FlightCard from "../component/FlightCard.vue";
import { onMounted, ref, watch } from "vue";

const emits = defineEmits(["searchBooking", "getFlightsByDate"]);

const currencies = ref<string[]>([]);
const date = ref();
const currentCurrency = ref("EUR");
const bookingSearch = ref();

const searchBooking = () => {
  emits("searchBooking", bookingSearch.value);
};

const getFlightsByDate = () => {
  emits("getFlightsByDate", date.value);
};

const getCurrencies = async () => {
  try {
    const res = await fetch("http://localhost:3000/conversion");
    console.log(res);
    return res.json();
  } catch (e) {
    console.log(e);
  }
};
watch(currentCurrency, (newCurrency, oldCurrency) => {
  localStorage.currency = newCurrency;
});

onMounted(async () => {
  currencies.value = await getCurrencies();
});
const flights = defineProps({
  flights: {
    type: Array as () => Flight[],
    required: true,
  },
});
</script>

<template>
  <nav class="flex justify-end items-center space-x-2 px-2 pt-2">
      <!-- Label and Input -->
      <div class="flex items-left">
        <input
          type="text"
          v-model="bookingSearch"
          placeholder="Search your booking"
          @keyup.enter="searchBooking"
          class="w-full p-2 bg-white rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      <!-- Date Input -->
      <div class="flex items-center ">
        <input
          type="date"
          v-model="date"
          @change="getFlightsByDate"
          class="w-full p-2 bg-white rounded-md border border-gray-300 shadow-sm"
        />

      </div>

      <!-- Currency Select -->
      <div class="flex items-center">
        <select
          name="currency"
          v-model="currentCurrency"
          class="w-full p-2 bg-white rounded-md border border-gray-300 shadow-sm"
        >
          <option v-for="currency of currencies" :value="currency">
            {{ currency }}
          </option>
        </select>
      </div>
    </nav>
  <div class="flex flex-col">
    <div v-if="flights.length === 0">Loading...</div>
    <div v-else>
      <Carousel
        :perPageCustom="[
          [0, 1],
          [768, 2],
          [1024, 3],
        ]"
      >
        <Slide v-for="flight in flights.flights" :key="flight.id">
          <FlightCard :flight="flight" />
        </Slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>
