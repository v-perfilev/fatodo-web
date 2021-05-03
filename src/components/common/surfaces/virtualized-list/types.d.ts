import {ListChildComponentProps, ListOnItemsRenderedProps} from 'react-window';

export type OnItemsRendered = (props: ListOnItemsRenderedProps) => any;

export interface ListItemProps<T = any> extends ListChildComponentProps<T> {
  isVisible: boolean;
}

export interface ListItemDataProps<T = any> {
  items: T[];
}
