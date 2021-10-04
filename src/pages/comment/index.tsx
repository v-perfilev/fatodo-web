import React, {FC, useEffect, useRef, useState} from 'react';
import {commentStyles} from './_styles';
import {Box} from '@material-ui/core';
import CommentControl from './comment-control';
import CommentList, {CommentListMethods} from './comment-list';
import {User} from '../../models/user.model';
import withAuthState from '../../shared/hocs/with-auth-state/with-auth-state';
import {flowRight} from 'lodash';
import {Comment} from '../../models/comment.model';
import withComment from '../../shared/hocs/with-comment/with-comment';
import {useWsCommentContext} from '../../shared/contexts/comment-contexts/ws-comment-context';

type Props = {
  targetId: string;
  account: User;
};

const Comment: FC<Props> = ({targetId, account}: Props) => {
  const classes = commentStyles();
  const {selectCommentTargetIdForWs} = useWsCommentContext();
  const [reference, setReference] = useState<Comment>();
  const commentListRef = useRef<CommentListMethods>();

  const clearReference = (): void => {
    setReference(null);
  };

  const addComment = (comment: Comment): void => {
    commentListRef.current?.addComment(comment);
  };

  useEffect(() => {
    selectCommentTargetIdForWs(targetId);
  }, [targetId]);

  return (
    <Box className={classes.root}>
      <CommentControl
        targetId={targetId}
        account={account}
        reference={reference}
        clearReference={clearReference}
        addComment={addComment}
      />
      <CommentList targetId={targetId} account={account} setReference={setReference} commentListRef={commentListRef} />
    </Box>
  );
};

export default flowRight([withComment, withAuthState])(Comment);
