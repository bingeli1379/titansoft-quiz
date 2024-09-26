<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="app">
    <RouterView />
  </main>
</template>

<style scoped>
.app {
  height: 100dvh;
  min-width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
}
</style>
