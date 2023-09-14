<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import Header from '../component/Header.vue';
import FlightCard from '../component/FlightCard.vue';
import { ref, onMounted } from 'vue';
import { Flight } from '../../../contract/index';
import { useRouter } from 'vue-router';

onMounted(async () => {
  flights.value = await getFlights();
});

const router = useRouter();
const getFlights = async () => {
  try {
    const response = await fetch(
      'http://localhost:3000/flights/?currency=' + localStorage.currency
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

const flights = ref<Flight[]>([]);

const getFlightsByDate = async (date: string) => {
  if (date) {
    const response = await fetch('http://localhost:3000/flights/date/?date=' + date);
    flights.value = await response.json();
  } else {
    flights.value = await getFlights();
  }
};

const searchBooking = (bookingSearch: string) => {
  router.push({ path: 'recap', query: { id: bookingSearch } });
};

onMounted(async () => {
  flights.value = await getFlights();
});
</script>

<template>
  <div class="flex flex-col">
    <Header @searchBooking="searchBooking" @getFlightsByDate="getFlightsByDate" />
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
