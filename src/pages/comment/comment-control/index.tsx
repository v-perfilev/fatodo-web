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
import {CommentDTO} from '../../../models/dto/comment.dto';

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

  const comment = useMemo<Comment>(
    () => ({
      id: NEW_COMMENT_PREFIX + RandomUtils.generate().toString(),
      threadId: null,
      targetId: targetId,
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

  const dto = useMemo<CommentDTO>(
    () => ({
      text: commentBody,
      referenceId: reference?.id,
    }),
    [commentBody, reference]
  );

  const send = (): void => {
    if (commentBody.trim().length > 0) {
      addComment(comment);
      setCommentBody('');
      clearReference();
      CommentService.addComment(targetId, dto).catch(handleResponse);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.inputWithButton}>
        <CommentControlInput send={send} comment={commentBody} setComment={setCommentBody} reference={reference} />
        <CommentControlSendButton send={send} />
      </Box>
      <Box className={classes.reference}>
        <CommentControlReference reference={reference} clearReference={clearReference} />
      </Box>
    </Box>
  );
};

export default CommentControl;
