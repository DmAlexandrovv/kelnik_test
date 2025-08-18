<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <scroll-up></scroll-up>
  </div>
</template>

<script setup lang="ts">
import ScrollUp from '~/src/components/ScrollUp.vue';
</script>

<style lang="scss">
body {
  font-family: 'PTRootUI', sans-serif;
}
</style>