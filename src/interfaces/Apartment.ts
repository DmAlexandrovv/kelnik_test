interface Apartment {
  id: string;
  name: string;
  area: number;
  floor: number;
  maxFloor: number;
  cost: number;
}

enum SORT_DIRECTIONS {
  ASC,
  DESC,
}

enum SORTABLE_COLUMN_TYPES {
  AREA,
  FLOOR,
  COST,
}

interface Sort {
  columnType: SORTABLE_COLUMN_TYPES,
  direction: SORT_DIRECTIONS,
}

export type { Apartment, Sort };
export { SORT_DIRECTIONS, SORTABLE_COLUMN_TYPES };
