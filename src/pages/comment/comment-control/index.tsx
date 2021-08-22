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

type Props = {
  targetId: string;
  parentId?: string;
  account: User;
  addComment: (comment: Comment) => void;
};

const CommentControl: FC<Props> = ({targetId, parentId, account, addComment}: Props) => {
  const classes = commentControlStyles();
  const {handleResponse} = useSnackContext();
  const [commentBody, setCommentBody] = useState<string>('');

  const message = useMemo<Comment>(
    () => ({
      id: NEW_COMMENT_PREFIX + RandomUtils.generate().toString(),
      threadId: null,
      parentId: null,
      userId: account.id,
      text: commentBody,
      isDeleted: false,
      reactions: [],
      createdAt: new Date().getTime(),
      createdBy: account.id,
      children: null,
    }),
    [commentBody]
  );

  const send = (): void => {
    if (commentBody.trim().length > 0) {
      addComment(message);
      if (!!parentId) {
        CommentService.addChild(parentId, commentBody).catch(handleResponse);
      } else {
        CommentService.addParent(targetId, commentBody).catch(handleResponse);
      }
    }
  };

  return (
    <Box className={classes.root}>
      <CommentControlInput send={send} setComment={setCommentBody} />
      <CommentControlSendButton send={send} />
    </Box>
  );
};

export default CommentControl;
