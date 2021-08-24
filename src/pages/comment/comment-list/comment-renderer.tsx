import React, {FC, memo} from 'react';
import {CommentItemProps} from '../types';
import {areEqual} from 'react-window';
import {commentRendererStyles} from './_styles';
import CommentItem from '../comment-item';

type Props = CommentItemProps;

const CommentRenderer: FC<Props> = ({data, index, style}: Props) => {
  const classes = commentRendererStyles();
  const comment = data.items[index];
  const account = data.account;
  const setReference = data.setReference;

  return (
    <div className={classes.root} style={style}>
      <CommentItem comment={comment} account={account} setReference={setReference} />
    </div>
  );
};

export default memo(CommentRenderer, areEqual);
