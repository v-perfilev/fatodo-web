import React, {FC, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import {commentControlStyles} from './_styles';
import CommentControlInput from './comment-control-input';
import CommentControlSendButton from './comment-control-send-button';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {User} from '../../../models/user.model';
import {Comment} from '../../../models/comment.model';
import {RandomUtils} from '../../../shared/utils/random.utils';
import {NEW_COMMENT_PREFIX} from '../_constants';
import CommentService from '../../../services/comment.service';
import CommentControlReference from './comment-control-reference';

type Props = {
  targetId: string;
  account: User;
  reference?: Comment;
  clearReference: () => void;
  addComment: (comment: Comment) => void;
};

const CommentControl: FC<Props> = ({targetId, account, reference, clearReference, addComment}: Props) => {
  const classes = commentControlStyles();
  const {handleResponse} = useSnackContext();
  const [commentBody, setCommentBody] = useState<string>('');

  const message = useMemo<Comment>(
    () => ({
      id: NEW_COMMENT_PREFIX + RandomUtils.generate().toString(),
      threadId: null,
      userId: account.id,
      text: commentBody,
      isDeleted: false,
      reference: reference,
      reactions: [],
      createdAt: new Date().getTime(),
      createdBy: account.id,
    }),
    [commentBody]
  );

  const send = (): void => {
    if (commentBody.trim().length > 0) {
      addComment(message);
      if (reference) {
        CommentService.addCommentWithReference(reference.id, commentBody).catch(handleResponse);
      } else {
        CommentService.addComment(targetId, commentBody).catch(handleResponse);
      }
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.inputWithButton}>
        <CommentControlInput send={send} setComment={setCommentBody} />
        <CommentControlSendButton send={send} />
      </Box>
      <Box className={classes.reference}>
        <CommentControlReference reference={reference} clearReference={clearReference} />
      </Box>
    </Box>
  );
};

export default CommentControl;
