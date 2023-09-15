<script setup lang="ts">
import { onMounted, ref } from 'vue';

const frontApiStatus = ref(false);
const reportApiStatus = ref(false);
const dbApiStatus = ref(false);
const externalApiStatus = ref(false);
const backendEngineApiStatus = ref(false);

onMounted(async () => {
    if((await fetch('http://localhost:3000/health')).ok) frontApiStatus.value = true;
    if((await fetch('http://localhost:3004/health')).ok) reportApiStatus.value = true;
    if((await fetch('http://localhost:3002/health')).ok) dbApiStatus.value = true; 
    if((await fetch('http://localhost:3001/health')).ok) externalApiStatus.value = true; 
    if((await fetch('http://localhost:3003/health')).ok) backendEngineApiStatus.value = true; 
});
</script>

<template>
    <div>
        <div>
            <div>front api status: {{ frontApiStatus }}</div>
        </div>
        <div>
            <div>report api status: {{ reportApiStatus }}</div>
        </div>
        <div>
            <div>db api status: {{ dbApiStatus }}</div>
        </div>
        <div>
            <div>external api status: {{ externalApiStatus }}</div>
        </div>
        <div>
            <div>backend api status: {{ backendEngineApiStatus }}</div>
        </div>
    </div>
</template>