import React, {Dispatch, SetStateAction} from 'react';
import {Comment} from '../../../../models/Comment';
import ReplyIcon from '../../../../components/icons/ReplyIcon';
import {IconButton} from '@mui/material';

type CommentListItemReferenceButtonProps = {
  comment: Comment;
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentListItemReferenceButton = ({comment, setReference}: CommentListItemReferenceButtonProps) => {
  const updateReference = (): void => setReference(comment);

  return (
    <IconButton color="primary" size="small" onClick={updateReference}>
      <ReplyIcon />
    </IconButton>
  );
};

export default CommentListItemReferenceButton;
