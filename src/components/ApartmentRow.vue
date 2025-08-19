<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';

import type { Apartment } from '~/src/interfaces/Apartment';

const { apartment } = defineProps({
  apartment: {
    type: Object as PropType<Apartment>,
    required: true,
  },
});

const cost = computed(() => new Intl.NumberFormat('ru-RU').format(apartment.cost));
const area = computed(() => apartment.area.toString().replace('.', ','));
</script>

<template>
  <li class="apartment">
    <div class="apartment__layout">
      <img src="~/assets/svg/apartmentLayout.svg" alt="Планировка"/>
    </div>
    <div class="apartment__text fw6">{{ apartment.name }}</div>
    <div class="apartment__text">{{ area }}</div>
    <div class="apartment__text apartment-floor">
      {{ apartment.floor }} из <span class="apartment-floor__max">{{ apartment.maxFloor }}</span>
    </div>
    <div class="apartment__text">{{ cost }}</div>
  </li>
</template>

<style lang="scss" scoped>
.apartment {
  .apartment-floor__max {
    opacity: .5;
  }

  &__text {
    color: $dark;
    font-size: 16px;
    line-height: 24px;
  }

  &__layout {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>