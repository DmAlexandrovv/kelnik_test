import { defineStore } from 'pinia';
import { DEFAULT_COST_FILTER_RANGE, DEFAULT_AREA_FILTER_RANGE } from '~/src/const';

interface State {
  cost: [number, number],
  area: [number, number],
  numberOfRooms: number | null,
}

export const useFiltersStore = defineStore('filters', {
  state: (): State => {
    return {
      cost: DEFAULT_COST_FILTER_RANGE as [number, number],
      area: DEFAULT_AREA_FILTER_RANGE as [number, number],
      numberOfRooms: null,
    }
  },
  actions: {
    setCost(range: [number, number]) {
      this.cost = range;
    },

    setArea(range: [number, number]) {
      this.area = range;
    },

    setNumberOfRooms(value: number | null) {
      if (value === this.numberOfRooms) {
        this.numberOfRooms = null;
      } else {
        this.numberOfRooms = value;
      }
    },

    reset() {
      this.cost = DEFAULT_COST_FILTER_RANGE as [number, number];
      this.area = DEFAULT_AREA_FILTER_RANGE as [number, number];
      this.numberOfRooms = null;
    }
  },
});