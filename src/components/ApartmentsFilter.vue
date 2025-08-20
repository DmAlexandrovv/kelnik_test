<script setup lang="ts">
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueSlider from 'vue-3-slider-component';

import { useFiltersStore } from '~/src/stores/filters';

import { MAX_NUMBER_OF_ROOMS, DEFAULT_COST_FILTER_RANGE, DEFAULT_AREA_FILTER_RANGE } from '~/src/const';

const filtersStore = useFiltersStore();

const numberOfRooms = computed(() => filtersStore.numberOfRooms);
const costSliderValue = computed(() => filtersStore.cost);
const areaSliderValue = computed(() => filtersStore.area);

const { setNumberOfRooms, setArea, setCost, reset } = filtersStore;
const { existingNumberOfRooms } = defineProps({
  existingNumberOfRooms: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
});

</script>

<template>
  <div class="apartments-filter">
    <div class="number-of-rooms-filter">
      <button
        v-for="num in MAX_NUMBER_OF_ROOMS"
        :key="num"
        :disabled="!existingNumberOfRooms.includes(num)"
        :class="{ 'number-of-rooms-filter__btn': true, 'number-of-rooms-filter__btn--active': num === numberOfRooms }"
        @click="setNumberOfRooms(num)"
      >
        <span :class="{ 'o-20': !existingNumberOfRooms.includes(num) }">{{ num }}к</span>
      </button>
    </div>
    <div class="cost-filter mt4">
      <span class="apartments-filter__text">Стоимость квартиры, ₽</span>
      <div class="flex justify-between mt3 mb2">
        <span class="apartments-filter__label">
          <span class="o-50">от</span> <span class="fw6">{{ costSliderValue[0] }}</span>
        </span>
        <span class="apartments-filter__label">
          <span class="o-50">до</span> <span class="fw6">{{ costSliderValue[1] }}</span>
        </span>
      </div>
      <VueSlider
        :model-value="costSliderValue"
        :min="DEFAULT_COST_FILTER_RANGE[0]"
        :max="DEFAULT_COST_FILTER_RANGE[1]"
        tooltip="none"
        @update:model-value="setCost"
      />
    </div>
    <div class="cost-filter mt4">
      <span class="apartments-filter__text">Площадь, м²</span>
      <div class="flex justify-between mt3 mb2">
        <span class="apartments-filter__label">
          <span class="o-50">от</span> <span class="fw6">{{ areaSliderValue[0] }}</span>
        </span>
        <span class="apartments-filter__label">
          <span class="o-50">до</span> <span class="fw6">{{ areaSliderValue[1] }}</span>
        </span>
      </div>
      <VueSlider
        :model-value="areaSliderValue"
        :min="DEFAULT_AREA_FILTER_RANGE[0]"
        :max="DEFAULT_AREA_FILTER_RANGE[1]"
        tooltip="none"
        @update:model-value="setArea"
      />
    </div>
    <button class="apartments-filter__reset-btn" @click="reset">
      Сбросить параметры
      <FontAwesomeIcon
        icon="close"
      />
    </button>
  </div>
</template>

<style scoped lang="scss">
.apartments-filter {
  height: 400px;
  border-radius: 20px;
  padding: 40px;

  background: linear-gradient(-45deg, rgba(149, 208, 161, .3), rgba(174, 228, 178, .3));

  color: $dark;

  &__label {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }

  .number-of-rooms-filter {
    &__btn {
      border-radius: 50%;
      background: $white;
      width: 44px;
      height: 44px;
      margin-right: 10px;

      cursor: pointer;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: $dark;

      transition: transform 0.3s;

      &--active,
      &:hover:not(:disabled) {
        background: $green-active;
        color: $white;
        box-shadow: 0 4px 8px $green-light;
      }

      &:hover:not(:disabled) {
        transform: scale(1.1);
      }

      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  &__reset-btn {
    background: transparent;
    margin-top: 20px;
    display: flex;
    align-items: center;

    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: $dark;

    &:hover {
      color: $danger;
    }

    svg {
      margin-left: 10px;
    }
  }

  :deep(.vue-slider-dot-handle) {
    background: $green-active;
    box-shadow: none;
  }

  :deep(.vue-slider-process) {
    background: $green-active;
  }

  :deep(.vue-slider-rail) {
    background: $green-light;
  }
}
</style>