<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const emits = defineEmits(['searchBooking', 'getFlightsByDate']);

const currencies = ref<string[]>([]);
const date = ref();
const currentCurrency = ref('EUR');
const bookingSearch = ref();

const searchBooking = () => {
  emits('searchBooking', bookingSearch.value);
};

const getFlightsByDate = () => {
  emits('getFlightsByDate', date.value);
};

const getCurrencies = async () => {
    try {
        const res = await fetch('http://localhost:3000/conversion');
        return res.json();
    } catch(e) {
        console.log(e);
    }
}
watch(currentCurrency, (newCurrency, oldCurrency) => {
    localStorage.currency = newCurrency;
})

onMounted(async () => {
  currencies.value = await getCurrencies();
})
</script>

<template>
  <header>
    <div class="flex flex-row justify-between items-center p-4">
      <div>
        <label for="text" class="block text-sm font-medium leading-6 text-gray-900 pb-1"
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
        <input
          type="date"
          v-model="date"
          @change="getFlightsByDate"
          class="block rounded-md border border-black p-2 text-gray-900 shadow-sm"
        />
      </div>
    </div>
    {{ currentCurrency }}
    <select name="currency" v-model="currentCurrency">
        <option v-for="currency of currencies" :value="currency">{{ currency }}</option>
    </select>
  </header>
</template>
