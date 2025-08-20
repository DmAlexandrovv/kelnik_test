<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import { useMediaQuery } from '@vueuse/core'

import type { Apartment } from '~/src/interfaces';

const { apartment } = defineProps({
  apartment: {
    type: Object as PropType<Apartment>,
    required: true,
  },
});

const cost = computed(() => new Intl.NumberFormat('ru-RU').format(apartment.cost));
const area = computed(() => apartment.area.toString().replace('.', ','));

const isLaptop = useMediaQuery('(max-width: 960px)');
</script>

<template>
  <li class="apartment">
    <template v-if="isLaptop">
      <div class="pl3">
        <div class="apartment__text fw6">{{ apartment.numberOfRooms }}-комнатная №{{ apartment.number }}</div>
        <div class="flex mt2">
          <div class="apartment__text mr3">{{ area }}м²</div>
          <div class="apartment__text apartment-floor mr3">
            {{ apartment.floor }} из <span class="apartment-floor__max">{{ apartment.maxFloor }} этаж</span>
          </div>
          <div class="apartment__text">{{ cost }} ₽</div>
        </div>
      </div>
      <div class="apartment__layout">
        <img src="~/assets/svg/apartmentLayout.svg" alt="Планировка"/>
      </div>
    </template>
    <template v-else>
      <div class="apartment__layout pl1">
        <img src="~/assets/svg/apartmentLayout.svg" alt="Планировка"/>
      </div>
      <div class="apartment__text fw6">{{ apartment.numberOfRooms }}-комнатная №{{ apartment.number }}</div>
      <div class="apartment__text">{{ area }}</div>
      <div class="apartment__text apartment-floor">
        {{ apartment.floor }} из <span class="apartment-floor__max">{{ apartment.maxFloor }}</span>
      </div>
      <div class="apartment__text">{{ cost }}</div>
    </template>
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
}
</style>