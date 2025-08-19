import { SORT_DIRECTIONS, SORTABLE_COLUMN_TYPES } from '~/src/const';

interface Apartment {
  id: string;
  number: number;
  numberOfRooms: number;
  area: number;
  floor: number;
  maxFloor: number;
  cost: number;
}

interface Sort {
  columnType: SORTABLE_COLUMN_TYPES,
  direction: SORT_DIRECTIONS,
}

interface Filter {
  cost: [number, number],
  area: [number, number],
  numberOfRooms: number | null,
}

export type { Apartment, Sort, Filter };
