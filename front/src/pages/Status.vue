<script setup lang="ts">
import { onMounted, ref } from 'vue';

const frontApiStatus = ref();
const externalApiStatus = ref();
const dbApiStatus = ref();
const backendEngineApiStatus = ref();
const reportApiStatus = ref();

onMounted(async () => {
  try {
    await fetch('http://localhost:3000/health');
    frontApiStatus.value = true;
  } catch {
    console.log('front api is not available');
    frontApiStatus.value = false;
  }

  try {
    await fetch('http://localhost:3001/health');
    externalApiStatus.value = true;
  } catch {
    console.log('report api is not available');
    externalApiStatus.value = false;
  }

  try {
    await fetch('http://localhost:3002/health');
    dbApiStatus.value = true;
  } catch {
    console.log('report api is not available');
    dbApiStatus.value = false;
  }

  try {
    await fetch('http://localhost:3003/health');
    backendEngineApiStatus.value = true;
  } catch {
    console.log('report api is not available');
    backendEngineApiStatus.value = false;
  }

  try {
    await fetch('http://localhost:3004/health');
    reportApiStatus.value = true;
  } catch {
    console.log('report api is not available');
    reportApiStatus.value = false;
  }
});
</script>

<template>
  <div>
    <div>
      <div>front api status: {{ frontApiStatus }}</div>
    </div>
    <div>
      <div>external api status: {{ externalApiStatus }}</div>
    </div>
    <div>
      <div>db api status: {{ dbApiStatus }}</div>
    </div>
    <div>
      <div>backend api status: {{ backendEngineApiStatus }}</div>
    </div>
    <div>
      <div>report api status: {{ reportApiStatus }}</div>
    </div>
  </div>
</template>
