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

  return (
    <div className={classes.root} style={style}>
      <CommentItem item={item} account={account} />
    </div>
  );
};

export default memo(CommentRenderer, areEqual);
