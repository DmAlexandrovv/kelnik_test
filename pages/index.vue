<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { type Apartment, type Sort, SORT_DIRECTIONS, SORTABLE_COLUMN_TYPES } from '~/src/interfaces/Apartment';
import ApartmentRow from '~/src/components/ApartmentRow.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const LOAD_STEP = 20;

const apartments = ref<Apartment[]>([]);
const offset = ref<number>(LOAD_STEP);
const totalCount = ref<number>(0);
const sort = ref<Sort|null>();

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

  if (sort !== null) {
    handleSort();
  }
}

const handleSort = () => {
  const compare = (a: Apartment, b: Apartment) => {
    let valA = 0;
    let valB = 0;

    switch (sort.value?.columnType) {
      case SORTABLE_COLUMN_TYPES.AREA:
        valA = a.area;
        valB = b.area;

        break;
      case SORTABLE_COLUMN_TYPES.FLOOR:
        valA = a.floor;
        valB = b.floor;

        break;
      case SORTABLE_COLUMN_TYPES.COST:
        valA = a.cost;
        valB = b.cost;

        break;

      default:
        throw new Error(`Unknown column ${sort.value?.columnType}`);
    }

    if (valA < valB) return sort.value?.direction === SORT_DIRECTIONS.ASC ? -1 : 1;
    if (valA > valB) return sort.value?.direction === SORT_DIRECTIONS.ASC ? 1 : -1;

    return 0;
  }

  apartments.value = [...apartments.value.toSorted(compare)];
};

const setSort = (direction: SORT_DIRECTIONS, columnType: SORTABLE_COLUMN_TYPES) => {
  sort.value = {
    direction,
    columnType,
  };

  handleSort();
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
          <span
            :class="{
              'apartments-list__text': true,
              'apartments-list__text--active': sort?.columnType === SORTABLE_COLUMN_TYPES.AREA
            }"
          >
            S, м²
          </span>
          <div class="apartments-list-column__sort sort">
            <font-awesome-icon
              icon="chevron-up"
              :class="{
                'sort__control': true,
                'sort__control--up': true,
                'sort__control--active': sort?.columnType === SORTABLE_COLUMN_TYPES.AREA && sort?.direction === SORT_DIRECTIONS.ASC
              }"
              @click="setSort(SORT_DIRECTIONS.ASC, SORTABLE_COLUMN_TYPES.AREA)"
            />
            <font-awesome-icon
              icon="chevron-down"
              :class="{
                'sort__control': true,
                'sort__control--down': true,
                'sort__control--active': sort?.columnType === SORTABLE_COLUMN_TYPES.AREA && sort?.direction === SORT_DIRECTIONS.DESC
              }"
              @click="setSort(SORT_DIRECTIONS.DESC, SORTABLE_COLUMN_TYPES.AREA)"
            />
          </div>
        </div>
        <div class="apartments-list-column">
          <span
            :class="{
              'apartments-list__text': true,
              'apartments-list__text--active': sort?.columnType === SORTABLE_COLUMN_TYPES.FLOOR
            }"
          >
            Этаж
          </span>
          <div class="apartments-list-column__sort sort">
            <font-awesome-icon
              icon="chevron-up"
              :class="{
                'sort__control': true,
                'sort__control--up': true,
                'sort__control--active': sort?.columnType === SORTABLE_COLUMN_TYPES.FLOOR && sort?.direction === SORT_DIRECTIONS.ASC
              }"
              @click="setSort(SORT_DIRECTIONS.ASC, SORTABLE_COLUMN_TYPES.FLOOR)"
            />
            <font-awesome-icon
              icon="chevron-down"
              :class="{
                'sort__control': true,
                'sort__control--down': true,
                'sort__control--active': sort?.columnType === SORTABLE_COLUMN_TYPES.FLOOR && sort?.direction === SORT_DIRECTIONS.DESC
              }"
              @click="setSort(SORT_DIRECTIONS.DESC, SORTABLE_COLUMN_TYPES.FLOOR)"
            />
          </div>
        </div>
        <div class="apartments-list-column">
          <span
            :class="{
              'apartments-list__text': true,
              'apartments-list__text--active': sort?.columnType === SORTABLE_COLUMN_TYPES.COST
            }"
          >
            Цена, ₽
          </span>
          <div class="apartments-list-column__sort sort">
            <font-awesome-icon
              icon="chevron-up"
              :class="{
                'sort__control': true,
                'sort__control--up': true,
                'sort__control--active': sort?.columnType === SORTABLE_COLUMN_TYPES.COST && sort?.direction === SORT_DIRECTIONS.ASC
              }"
              @click="setSort(SORT_DIRECTIONS.ASC, SORTABLE_COLUMN_TYPES.COST)"
            />
            <font-awesome-icon
              icon="chevron-down"
              :class="{
                'sort__control': true,
                'sort__control--down': true,
                'sort__control--active': sort?.columnType === SORTABLE_COLUMN_TYPES.COST && sort?.direction === SORT_DIRECTIONS.DESC
              }"
              @click="setSort(SORT_DIRECTIONS.DESC, SORTABLE_COLUMN_TYPES.COST)"
            />
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

      &--active {
        color: $green-active;
      }
    }

    &__header {
      margin-bottom: 16px;
    }

    &__apartment {
      padding: 16px 0 24px 0;
    }

    &-column {
      display: flex;

      &__sort {
        display: flex;
        flex-direction: column;
        margin-left: 6px;

        &.sort--active {
          color: $green-active;
        }

        .sort__control {
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

          &--active {
            color: $green-active;
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