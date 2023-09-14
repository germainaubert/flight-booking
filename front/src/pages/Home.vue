<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { Flight } from "../../../contract/index";
import FlightCard from "../component/FlightCard.vue";
const flights = defineProps({
  flights: {
    type: Array as () => Flight[],
    required: true,
  },
});
console.log(flights.flights);
</script>

<template>
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
