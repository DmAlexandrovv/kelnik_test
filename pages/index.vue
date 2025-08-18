<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import type { Apartment } from '~/src/interfaces/Apartment';
import ApartmentRow from '~/src/components/ApartmentRow.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const LOAD_STEP = 20;

const apartments = ref<Apartment[]>([]);
const offset = ref<number>(LOAD_STEP);
const totalCount = ref<number>(0);

onMounted(async () => {
  const data = await fetch(`http://localhost:3001/apartments?_page=1&_per_page=${offset.value}`)
    .then(res => res.json());

  apartments.value = data.data;
  totalCount.value = data.items;
});

const canFetchMore = computed(() => apartments.value.length < totalCount.value);

const loadMore = async () => {
  offset.value = offset.value + LOAD_STEP;

  const { data } = await fetch(`http://localhost:3001/apartments?_page=${Math.floor(offset.value / LOAD_STEP)}&_per_page=${LOAD_STEP}`)
    .then(res => res.json());

  apartments.value = [...apartments.value, ...data];
}
</script>

<template>
  <div class="apartments-page">
    <h2 class="apartments-page__title">Квартиры</h2>
    <ul class="apartments-list" v-if="apartments.length">
      <li class="apartments-list__header">
        <div class="apartments-list__text apartments-list-column">Планировка</div>
        <div class="apartments-list__text apartments-list-column">Квартира</div>
        <div class="apartments-list-column">
          <span class="apartments-list__text">S, м²</span>
          <div class="apartments-list-column__filter filter">
            <font-awesome-icon icon="chevron-up" class="filter__control filter__control--up" />
            <font-awesome-icon icon="chevron-down" class="filter__control filter__control--down" />
          </div>
        </div>
        <div class="apartments-list-column">
          <span class="apartments-list__text">Этаж</span>
          <div class="apartments-list-column__filter filter">
            <font-awesome-icon icon="chevron-up" class="filter__control filter__control--up" />
            <font-awesome-icon icon="chevron-down" class="filter__control filter__control--down" />
          </div>
        </div>
        <div class="apartments-list-column">
          <span class="apartments-list__text">Цена, ₽</span>
          <div class="apartments-list-column__filter filter">
            <font-awesome-icon icon="chevron-up" class="filter__control filter__control--up" />
            <font-awesome-icon icon="chevron-down" class="filter__control filter__control--down" />
          </div>
        </div>
      </li>
      <apartment-row
        v-for="apartment in apartments"
        :key="apartment.id"
        :apartment="apartment"
        class="apartments-list__apartment"
      >
      </apartment-row>
    </ul>
    <button
      v-if="canFetchMore"
      class="apartments-page__load-more-btn"
      @click="loadMore"
    >
      Загрузить еще
    </button>
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

    &-column {
      display: flex;

      &__filter {
        display: flex;
        flex-direction: column;
        margin-left: 6px;

        .filter__control {
          position: relative;

          font-size: 10px;
          opacity: .5;
          color: $dark;
          cursor: pointer;

          &--down {
            top: -2px;
          }

          &--up {
            top: 2px;
          }
        }
      }
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