import {User} from '../../../models/user.model';
import React, {FC} from 'react';
import {CommentItem} from '../types';
import {Container} from '@material-ui/core';
import {commentItemStyles} from './_styles';
import CommentItemComment from './comment-item-comment';
import CommentItemButton from './comment-item-button';
import CommentItemStub from './comment-item-stub';

type Props = {
  item: CommentItem;
  account: User;
  loadMoreItems: () => Promise<void>;
  loadMoreChildren: (parentId: string) => Promise<void>;
};

const CommentItem: FC<Props> = ({item, account, loadMoreItems, loadMoreChildren}: Props) => {
  const classes = commentItemStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      {item.type === 'comment' && <CommentItemComment comment={item.comment} account={account} />}
      {item.type === 'button' && (
        <CommentItemButton loadMoreItems={loadMoreItems} loadMoreChildren={loadMoreChildren} parentId={item.parentId} />
      )}
      {item.type === 'stub' && <CommentItemStub />}
    </Container>
  );
};

export default CommentItem;
