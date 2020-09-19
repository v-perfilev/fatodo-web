import {CSSProperties, MutableRefObject} from 'react';

export type SortingSize = {
  width: number;
  height: number;
};

export type SortingSizes = {
  container: SortingSize;
  item: SortingSize;
};

export interface StyleArgs {
  indexOrder: any;
  down?: boolean;
  originalIndex?: number;
  currentIndex?: number;
  x?: number;
  y?: number;
  immediate?: boolean;
}

export type SortProps = {
  setSortItems: (items: any[]) => void;
  setSortContainerRef: (element: HTMLDivElement) => void;
  setSortItemRef: (element: HTMLDivElement) => void;
  sortContainerHeight: string | number;
  sortOrder: MutableRefObject<number[]>;
  sortSprings: CSSProperties[];
  sortBind: (...any) => void;
};
