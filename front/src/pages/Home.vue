<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { Flight } from '../../../contract/index';
import FlightCard from '../component/FlightCard.vue';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const flights = ref<Flight[]>([]);
const currencies = ref<string[]>([]);
const date = ref();
const currentCurrency = ref(localStorage.currency || 'USD');
const bookingSearch = ref();
console.log(localStorage);
const searchBooking = async () => {
  try {
    const response = await fetch('http://localhost:3000/booking/id/?id=' + bookingSearch.value);
    console.log(response);
    const json = await response.json();
    console.log(json);
    router.push({ name: 'recap', query: { id: json.id } });
  } catch (e) {
    console.log(e);
  }
};

const getFlightsByDate = async () => {
  try {
    const dateValue = date.value;
    const response = await fetch('http://localhost:3000/flights/date/?date=' + dateValue);
    const json = await response.json();
    flights.value = json;
  } catch (e) {
    console.log(e);
  }
};

const getFlights = async () => {
  try {
    const response = await fetch('http://localhost:3000/flight/?currency=' + localStorage.currency);
    if (!response.ok) {
      throw new Error('Unable to get the list of flights');
    }
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

const getCurrencies = async () => {
  try {
    const res = await fetch('http://localhost:3000/currency/list');
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

watch(currentCurrency, (newCurrency, oldCurrency) => {
  localStorage.currency = newCurrency;
  // refresh page
  location.reload();
});

onMounted(async () => {
  currencies.value = await getCurrencies();
  flights.value = await getFlights();
});
</script>

<template>
  <nav class="flex justify-end items-center space-x-2 px-2 py-6">
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
    <div class="flex items-center">
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
        <Slide v-for="flight in flights" :key="flight.id">
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
