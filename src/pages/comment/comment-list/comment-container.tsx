import React, {FC, ReactElement, useCallback, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {VirtualizedList} from '../../../components/surfaces';
import {CommentItem, CommentListDataProps, CommentItemProps} from '../types';
import {commentsContainerStyles} from './_styles';
import {User} from '../../../models/user.model';
import CommentRenderer from './comment-renderer';

type Props = {
  items: CommentItem[];
  loadMoreItems: () => Promise<void>;
  loadMoreChildren: (parentId: string) => Promise<void>;
  account: User;
};

const CommentContainer: FC<Props> = (props: Props) => {
  const {items, loadMoreItems, loadMoreChildren, account} = props;
  const classes = commentsContainerStyles();

  const getItemKey = useCallback(
    (index: number): string => {
      return items[index].id;
    },
    [items]
  );

  const itemRenderer = useCallback((props: CommentItemProps): ReactElement => <CommentRenderer {...props} />, []);

  const itemData = useMemo<CommentListDataProps>(
    () => ({
      items,
      account,
      loadMoreItems,
      loadMoreChildren,
    }),
    [items]
  );

  return (
    <Box className={classes.root}>
      <VirtualizedList itemRenderer={itemRenderer} itemData={itemData} itemKey={getItemKey} />
    </Box>
  );
};

export default CommentContainer;
