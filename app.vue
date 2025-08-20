<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <ScrollUp></ScrollUp>
  </div>
</template>

<script setup lang="ts">
import ScrollUp from '~/src/components/ScrollUp.vue';
</script>

<style lang="scss">
body, button {
  font-family: 'PTRootUI', sans-serif;
}
</style>