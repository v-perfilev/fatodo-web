import React, {FC, memo} from 'react';
import {CommentItemProps} from '../types';
import {areEqual} from 'react-window';
import {commentsRendererStyles} from './_styles';
import CommentItem from '../comment-item';

type Props = CommentItemProps;

const CommentRenderer: FC<Props> = ({data, index, style}: Props) => {
  const classes = commentsRendererStyles();
  const item = data.items[index];
  const account = data.account;
  const loadMoreItems = data.loadMoreItems;
  const loadMoreChildren = data.loadMoreChildren;

  return (
    <div className={classes.root} style={style}>
      <CommentItem item={item} account={account} loadMoreItems={loadMoreItems} loadMoreChildren={loadMoreChildren} />
    </div>
  );
};

export default memo(CommentRenderer, areEqual);
