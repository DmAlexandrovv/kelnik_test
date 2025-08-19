import { SORT_DIRECTIONS, SORTABLE_COLUMN_TYPES } from '~/src/const';

interface Apartment {
  id: string;
  name: string;
  area: number;
  floor: number;
  maxFloor: number;
  cost: number;
}

interface Sort {
  columnType: SORTABLE_COLUMN_TYPES,
  direction: SORT_DIRECTIONS,
}

export type { Apartment, Sort };
