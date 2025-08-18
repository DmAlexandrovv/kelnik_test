<template>
  <div class="scroll-up">
    <button v-if="isButtonVisible" class="scroll-up__btn" @click="handleScroll">
      <font-awesome-icon icon="arrow-up" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const isButtonVisible = ref<boolean>(false);

const handleScroll = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollListener = () => {
  isButtonVisible.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener('scroll', scrollListener);
});

onUnmounted(() => {
  window.removeEventListener('scroll', scrollListener);
});
</script>

<style scoped lang="scss">
.scroll-up__btn {
  position: fixed;
  right: 50px;
  bottom: 50px;

  width: 40px;
  height: 40px;

  border-radius: 50%;
  border: none;
  background: $green-light;
  color: $white;
  outline: none;

  cursor: pointer;
  font-size: 18px;
}
</style>