import {ListOnItemsRenderedProps} from 'react-window';

export type OnItemsRendered = (props: ListOnItemsRenderedProps) => any;

export interface ListDataProps<T = any> {
  items: T[];
}
