<script setup lang="ts">
import { ref } from "vue";
import { Flight } from "../../../contract/index.ts";
const {flightSelected} = defineProps({
  flightSelected: Flight,
});

const form = ref({
  firstname: "",
  lastname: "",
  email: "",
  flightSelected,
});
const submit = () => {
    createUser(form.value);
    router.push({ name: "Flight" });
};

const createUser = async (user) => {
    const response = await fetch("http://localhost:3000/users", {
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
  <div class="text-xl text-center h-screen flex items-center justify-center">
    {{ flightSelected }}
    <form
      @submit.prevent="submit"
      class="flex flex-col space-y-4 border-2 border-gray-200 p-4"
    >
      <input
        type="text"
        v-model="form.firstname"
        placeholder="firstname"
        class="border-2 border-gray-200 p-2"
      />
      <input
        type="text"
        v-model="form.lastname"
        placeholder="lastname"
        class="border-2 border-gray-200 p-2"
      />
      <input
        type="text"
        v-model="form.email"
        placeholder="email"
        class="border-2 border-gray-200 p-2"
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
