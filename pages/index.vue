<script setup lang="ts">
import { ref } from 'vue';

import type { Apartment } from '~/src/interfaces/Apartment';
import ApartmentRow from "~/src/components/ApartmentRow.vue";

const apartments = ref<Apartment[]>([
  {
    id: '11',
    name: '3-х комнатная квартира',
    area: 54.5,
    floor: 1,
    cost: 6545000,
    maxFloor: 17,
  },
  {
    id: '22',
    name: '3-х комнатная квартира',
    area: 54,
    floor: 1,
    cost: 6545000,
    maxFloor: 17,
  },
  {
    id: '33',
    name: '3-х комнатная квартира',
    area: 54,
    floor: 1,
    cost: 6545000,
    maxFloor: 17,
  },
  {
    id: '44',
    name: '3-х комнатная квартира',
    area: 54.5,
    floor: 1,
    cost: 6545000,
    maxFloor: 17,
  },
  {
    id: '55',
    name: '3-х комнатная квартира',
    area: 54,
    floor: 1,
    cost: 6545000,
    maxFloor: 17,
  }
]);
</script>

<template>
  <div class="apartments-page">
    <h2 class="apartments-page__title">Квартиры</h2>
    <ul class="apartments-list" v-if="apartments.length">
      <li class="apartments-list__header">
        <div class="apartments-list__text">Планировка</div>
        <div class="apartments-list__text">Квартира</div>
        <div class="apartments-list__text">S, м²</div>
        <div class="apartments-list__text">Этаж</div>
        <div class="apartments-list__text">Цена, ₽</div>
      </li>
      <apartment-row
        v-for="apartment in apartments"
        :key="apartment.id"
        :apartment="apartment"
        class="apartments-list__apartment"
      >
      </apartment-row>
    </ul>
    <button class="apartments-page__load-more-btn">Загрузить еще</button>
  </div>
</template>

<style lang="scss" scoped>
.apartments-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 96px 80px;

  &__title {
    color: $dark;
    font-weight: 700;
    font-size: 54px;
    line-height: 55px;
    margin-bottom: 21px;
  }

  .apartments-list {
    display: grid;

    list-style-type: none;

    &__apartment,
    &__header {
      display: grid;
      grid-template-columns: 80px 1fr 120px 120px 120px;
      gap: 10px;
    }

    &__text {
      font-weight: 400;
      color: $dark;
      font-size: 14px;
      line-height: 20px;
    }

    &__header {
      margin-bottom: 16px;
    }

    &__apartment {
      padding: 16px 0 24px 0;
    }
  }

  &__load-more-btn {
    border-radius: 25px;
    border: 1px solid $stroke;
    background: $white;
    outline: none;
    padding: 8px 24px;
    margin-top: 40px;

    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>