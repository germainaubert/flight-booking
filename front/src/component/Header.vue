<script setup lang="ts">
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
</script>

<template>
  <header>
    <div
      class="flex items-center justify-center text-white py-8 bg-gradient-to-r from-red-800 to-red-500"
    >
      <h1 class="text-4xl font-bold text-white text-center">Flight booking</h1>
    </div>
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
  </header>
</template>
