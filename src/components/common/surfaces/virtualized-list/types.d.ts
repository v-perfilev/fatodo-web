import {ListChildComponentProps, ListOnItemsRenderedProps} from 'react-window';

export type OnItemsRendered = (props: ListOnItemsRenderedProps) => any;

export type ListItemProps = ListChildComponentProps & {
  isVisible: boolean;
};
