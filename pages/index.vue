<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useDebounceFn, useMediaQuery } from "@vueuse/core"

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { useFiltersStore } from '~/src/stores/filters';

import type { Apartment, Sort, Filter } from '~/src/interfaces';
import { SORT_DIRECTIONS, SORTABLE_COLUMN_TYPES } from '~/src/const';

import ApartmentRow from '~/src/components/ApartmentRow.vue';
import ApartmentsFilter from '~/src/components/ApartmentsFilter.vue';

const LOAD_STEP = 20;

const filtersStore = useFiltersStore();

const filter = computed(() => ({
  numberOfRooms: filtersStore.numberOfRooms,
  cost: filtersStore.cost,
  area: filtersStore.area,
}));

const allApartments = ref<Apartment[]>([]);
const apartments = ref<Apartment[]>([]);
const offset = ref<number>(LOAD_STEP);
const totalCount = ref<number>(0);
const sort = ref<Sort|null>();

const canFetchMore = computed(() => allApartments.value.length < totalCount.value);
const existingNumberOfRooms = computed(
  () => [...allApartments.value
    .reduce((acc: Set<number>, apartment: Apartment) => acc.add(apartment.numberOfRooms) , new Set())]
);
const isLaptop = useMediaQuery('(max-width: 960px)');

onMounted(async () => {
  const data = await fetch(`http://localhost:3001/apartments?_page=1&_per_page=${offset.value}`)
    .then(res => res.json());

  apartments.value = data.data;
  allApartments.value = data.data;
  totalCount.value = data.items;
});

const debouncedHandleFilterApply = useDebounceFn((filter: Filter) => {
  handleFilterApply(filter);
}, 500);

watch(
  () => filter.value,
  (filter) => {
    debouncedHandleFilterApply(filter);
  },
  {
    deep: true,
    immediate: true,
  }
);

const loadMore = async () => {
  offset.value = offset.value + LOAD_STEP;

  const { data } = await fetch(`http://localhost:3001/apartments?_page=${Math.floor(offset.value / LOAD_STEP)}&_per_page=${LOAD_STEP}`)
    .then(res => res.json());

  allApartments.value = [...allApartments.value, ...data];

  handleFilterApply(filter.value);

  if (sort.value) {
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

const handleFilterApply = (filter: Filter) => {
  apartments.value = allApartments.value.filter((apartment: Apartment) => {
    const isCostFilterPassed = apartment.cost >= filter.cost[0] && apartment.cost <= filter.cost[1];
    const isAreaFilterPassed = apartment.area >= filter.area[0] && apartment.area <= filter.area[1];
    const isNumberOfRoomsFilterPassed = filter.numberOfRooms === null
      || apartment.numberOfRooms === filter.numberOfRooms;


    return isCostFilterPassed && isAreaFilterPassed && isNumberOfRoomsFilterPassed;
  });

  if (sort.value) {
    handleSort();
  }
};

</script>

<template>
  <div class="apartments-page">
    <h2 class="apartments-page__title">Квартиры</h2>
    <div class="apartments-page-content">
      <div class="apartments-list-wrapper">
        <ul class="apartments-list">
          <li class="apartments-list__header">
            <div class="apartments-list__text apartments-list-column" v-if="!isLaptop">Планировка</div>
            <div class="apartments-list__text apartments-list-column" v-if="!isLaptop">Квартира</div>
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
          <ApartmentRow
            v-for="apartment in apartments"
            :key="apartment.id"
            :apartment="apartment"
            class="apartments-list__apartment"
          >
          </ApartmentRow>
        </ul>
        <button
          v-if="canFetchMore"
          class="apartments-list-wrapper__load-more-btn fw6"
          @click="loadMore"
        >
          Загрузить еще
        </button>
      </div>
      <ApartmentsFilter :existing-number-of-rooms="existingNumberOfRooms"></ApartmentsFilter>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.apartments-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 96px 80px;

  &-content {
    display: grid;
    grid-template-columns: 3fr 2fr;
    column-gap: 40px;
  }

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
      grid-template-columns: minmax(80px, 1fr) minmax(150px, 2fr) minmax(40px, 1fr) minmax(40px, 1fr) minmax(70px, 1fr);
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

          transition: transform 0.3s;

          &:hover {
            color: $green-active;
            transform: scale(1.6);
          }

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

  .apartments-list-wrapper__load-more-btn {
    border-radius: 25px;
    border: 1px solid $stroke;
    background: $white;
    outline: none;
    padding: 8px 24px;
    margin-top: 40px;

    cursor: pointer;
    font-size: 16px;
    line-height: 24px;

    &:hover {
      background: $green-active;
      color: $white;
    }
  }
}

@media (max-width: 960px) {
  .apartments-page {
    .apartments-list {
      &__header {
        grid-template-columns: 60px 60px 90px;
      }

      &__apartment {
        grid-template-columns: auto 80px;
      }
    }
  }
}
</style>