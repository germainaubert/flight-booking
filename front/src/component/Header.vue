<script setup lang="ts">
import { ref } from "vue";

const emits = defineEmits(["searchBooking", "getFlightsByDate"]);

const date = ref();
const bookingSearch = ref();

const searchBooking = () => {
  emits("searchBooking", bookingSearch.value);
};

const getFlightsByDate = () => {
  console.log(date.value);
  emits("getFlightsByDate", date.value);
};
</script>

<template>
  <header>
    <div class="flex flex-row justify-between items-center p-4">
      <div>
        <label
          for="text"
          class="block text-sm font-medium leading-6 text-gray-900 pb-1"
          >Search your booking</label
        >
        <input
          type="text"
          v-model="bookingSearch"
          placeholder="Booking id"
          class="block w-full rounded-md border border-black p-2 text-gray-900 shadow-sm"
          @keyup.enter="searchBooking"
        />
      </div>
      <div>
        <h1 class="text-4xl font-bold">Flight booking</h1>
      </div>
      <div>
        <input type="date" v-model="date" @change="getFlightsByDate" class="block rounded-md border  border-black p-2 text-gray-900 shadow-sm" />
      </div>
    </div>
  </header>
</template>
