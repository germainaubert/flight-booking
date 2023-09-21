<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './component/Header.vue';

onMounted(() => {
  // EUR est la monnaie par défaut
  localStorage.currency = localStorage.currency || 'EUR';
});
</script>
<template>
  <Header />
  <router-view />
</template>
