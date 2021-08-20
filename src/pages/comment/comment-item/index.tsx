import {User} from '../../../models/user.model';
import React, {FC} from 'react';
import {CommentItem} from '../types';
import {Container} from '@material-ui/core';
import {commentItemStyles} from './_styles';
import CommentItemComment from './comment-item-comment';
import CommentItemButton from './comment-item-button';
import CommentItemStub from './comment-item-stub';
import CommentItemLoader from './comment-item-loader';

type Props = {
  item: CommentItem;
  account: User;
};

const CommentItem: FC<Props> = ({item, account}: Props) => {
  const classes = commentItemStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      {item.type === 'comment' && <CommentItemComment comment={item.comment} account={account} />}
      {item.type === 'button' && <CommentItemButton parentId={item.parentId} />}
      {item.type === 'loader' && <CommentItemLoader parentId={item.parentId} />}
      {item.type === 'stub' && <CommentItemStub />}
    </Container> 
  );
};

export default CommentItem;
