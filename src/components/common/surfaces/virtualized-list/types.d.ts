import {ListOnItemsRenderedProps} from 'react-window';

export type OnItemsRendered = (props: ListOnItemsRenderedProps) => any;

export interface ListItemDataProps<T = any> {
  items: T[];
}
