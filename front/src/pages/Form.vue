<script setup lang="ts">
import { ref } from 'vue';
import { Booking } from '../../../contract/index';
import { useRoute, useRouter } from 'vue-router';

const confirmText = ref('');
const route = useRoute();
const router = useRouter();
const flight = route.query;

const form = ref<Booking>({
  firstname: '',
  lastname: '',
  email: '',
  flightId: flight?.id as string,
});

const submit = async () => {
  try {
    const booking = await createBooking(form.value);
    router.push({ path: 'recap', query: { id: booking.id } });
  } catch (error) {
    console.log(error);
  }
};

const createBooking = async (user: Booking) => {
  const response = await fetch('http://localhost:3000/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};
</script>

<template>
  <div>
    <router-link to="/">Retour</router-link>
  </div>
  <div class="text-xl text-center h-screen flex items-center justify-center">
    <form @submit.prevent="submit" class="flex flex-col space-y-4 border-2 border-gray-200 p-4">
      <input
        type="text"
        v-model="form.firstname"
        placeholder="firstname"
        class="border-2 border-green-200 p-2"
      />
      <input
        type="text"
        v-model="form.lastname"
        placeholder="lastname"
        class="border-2 border-green-200 p-2"
      />
      <input
        type="text"
        v-model="form.email"
        placeholder="email"
        class="border-2 border-green-200 p-2"
      />

      <button type="submit">Submit</button>
    </form>
    {{ confirmText }}
  </div>
</template>
