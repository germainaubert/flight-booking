<template>
  <router-view />
</template>


<script setup lang='ts'>
import { onMounted } from 'vue';

onMounted(() => {
    // EUR est la monnaie par défaut
    localStorage.currency = "EUR"
});

</script>