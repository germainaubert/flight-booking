<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { Flight } from "../../contract/index";
import Header from "./component/Header.vue"

const router = useRouter();
const getFlights = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/flight/?currency=" + localStorage.currency
    );
    if(!response.ok) {
        throw new Error("Unable to get the list of flights");
    }
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

const flights = ref<Flight[]>([]);

const getFlightsByDate = async (date: string) => {
  if (date) {
    const response = await fetch(
      "http://localhost:3000/flights/date/?date=" + date
    );
    flights.value = await response.json();
  } else {
    flights.value = await getFlights();
  }
};

const searchBooking = (bookingSearch: string) => {
  router.push({ path: "recap", query: { id: bookingSearch } });
};

onMounted(async () => {
  flights.value = await getFlights();
});
onMounted(() => {
  // EUR est la monnaie par défaut
  localStorage.currency = "EUR";
});

</script>
<template>
  <Header @searchBooking="searchBooking" @getFlightsByDate="getFlightsByDate" />
  <router-view :flights="flights" v-if="flights.length " />  
</template>
