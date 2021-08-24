import React, {FC, ReactElement, useCallback, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {VirtualizedList} from '../../../components/surfaces';
import {CommentItemProps, CommentListDataProps} from '../types';
import {commentContainerStyles} from './_styles';
import {User} from '../../../models/user.model';
import CommentRenderer from './comment-renderer';
import {Comment} from '../../../models/comment.model';

type Props = {
  comments: Comment[];
  loadMoreItems?: () => Promise<void>;
  allLoaded?: boolean;
  account: User;
  setReference: (comment: Comment) => void;
};

const CommentContainer: FC<Props> = ({comments, loadMoreItems, allLoaded, account, setReference}: Props) => {
  const classes = commentContainerStyles();

  const getItemKey = useCallback(
    (index: number): string => {
      return comments[index].id;
    },
    [comments]
  );

  const itemRenderer = useCallback((props: CommentItemProps): ReactElement => <CommentRenderer {...props} />, []);

  const itemData = useMemo<CommentListDataProps>(
    () => ({
      items: comments,
      account,
      setReference,
    }),
    [comments]
  );

  return (
    <Box className={classes.root}>
      <VirtualizedList
        itemRenderer={itemRenderer}
        itemData={itemData}
        itemKey={getItemKey}
        loadMoreItems={loadMoreItems}
        allLoaded={allLoaded}
      />
    </Box>
  );
};

export default CommentContainer;
