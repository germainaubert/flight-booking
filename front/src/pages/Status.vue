<script setup lang="ts">
import { onMounted, ref } from 'vue';

const status = ref();

onMounted(async () => {
  const liveStatus = {
    frontApiStatus: false,
    externalApiStatus: false,
    dbApiStatus: false,
    backendEngineApiStatus: false,
    reportApiStatus: false,
  };

  try {
    await fetch('http://localhost:3000/health');
    liveStatus.frontApiStatus = true;
  } catch {
    console.log('front api is not available');
  }

  try {
    await fetch('http://localhost:3001/health');
    liveStatus.externalApiStatus = true;
  } catch {
    console.log('external api is not available');
  }

  try {
    await fetch('http://localhost:3002/health');
    liveStatus.dbApiStatus = true;
  } catch {
    console.log('db is not available');
  }

  try {
    await fetch('http://localhost:3003/health');
    liveStatus.backendEngineApiStatus = true;
  } catch {
    console.log('backend engine api is not available');
  }

  try {
    await fetch('http://localhost:3004/health');
    liveStatus.reportApiStatus = true;
  } catch {
    console.log('report api is not available');
  }

  status.value = liveStatus;
});
</script>

<template>
  <div>
    <div>
      <div>
        front api status:
        <span v-if="status === undefined"> Loading...</span>
        <span v-else> {{ status?.frontApiStatus }}</span>
      </div>
    </div>
    <div>
      external api status:
      <span v-if="status === undefined"> Loading...</span>
      <span v-else> {{ status?.externalApiStatus }}</span>
    </div>
    <div>
      db api status:
      <span v-if="status === undefined"> Loading...</span>
      <span v-else> {{ status?.dbApiStatus }}</span>
    </div>
    <div>
      backend api status:
      <span v-if="status === undefined"> Loading...</span>
      <span v-else> {{ status?.backendEngineApiStatus }}</span>
    </div>
    <div>
      report api status:
      <span v-if="status === undefined"> Loading...</span>
      <span v-else> {{ status?.reportApiStatus }}</span>
    </div>
  </div>
</template>
