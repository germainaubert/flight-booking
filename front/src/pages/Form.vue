<script setup lang="ts">
import { ref } from "vue";
import { Booking } from "../../../contract/index";
import { useRoute, useRouter } from "vue-router";
import { applyReduction } from "../helpers";
import { NO_VEGE_ROUTE } from "../const";

const confirmText = ref("");
const route = useRoute();
const router = useRouter();
const flight = route.query;
const currency  = localStorage.currency;  
const form = ref<Booking>({
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  flightId: flight?.id as string,
  vege: false,
  price: 0,
  currency: "",
  status: "pending",
});

const submit = async () => {
  try {
    const booking = await createBooking(form.value);
    router.push({ path: "recap", query: { id: booking.id } });
  } catch (error) {
    console.log(error);
  }
};

const createBooking = async (user: Booking) => {
  const response = await fetch("http://localhost:3000/booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};
</script>

<template>
  <div>
    <!-- Header with Red Gradient Background -->

    <!-- Form Container -->
    <div
      class="mx-auto max-w-md rounded-md shadow-md border border-gray-300 mt-4"
    >
      <div
        class="bg-gradient-to-l from-red-500 to-red-800 py-4 text-white text-center overflow-hidden rounded-t-md"
      >
        <span class="text-xl font-bold">
          Your booking for flight n°{{ flight?.id }}
        </span>
      </div>
      <form @submit.prevent="submit" class="flex flex-col space-y-2 p-8">
        <span class="text-xl font-bold">
          Fill the form to confirm your booking
        </span>
        <label for="firstname">Firstname</label>
        <input
          type="text"
          v-model="form.firstname"
          placeholder="John"
          class="w-full p-2 bg-white rounded-md border border-gray-300 shadow-sm"
        />
        <label for="lastname">Lastname</label>
        <input
          type="text"
          v-model="form.lastname"
          placeholder="Doe"
          class="w-full p-2 bg-white rounded-md border border-gray-300 shadow-sm"
        />
        <label for="email">Email</label>
        <input
          type="text"
          v-model="form.email"
          placeholder="john.doe@mail.com"
          class="w-full p-2 bg-white rounded-md border border-gray-300 shadow-sm"
        />
        <div class="flex items-center space-x-2">
          <input
            type="checkbox"
            v-model="form.vege"
            class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label for="vege">Vegetarian meal</label>
        </div>
        <span class="text-xl font-bold">
          Total price : {{ applyReduction(flight, 0.1, NO_VEGE_ROUTE) }} {{currency }}
        </span>
        <div class="border-t border-gray-300 pt-4 flex justify-between">
          <router-link to="/">
            <button
              class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
            >
              Back
            </button>
          </router-link>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 px-2"
          >
            Confirm
          </button>
        </div>
      </form>
      {{ confirmText }}
      <div></div>
    </div>
  </div>
</template>
