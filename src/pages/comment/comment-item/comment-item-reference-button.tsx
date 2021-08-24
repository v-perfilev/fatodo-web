import React, {FC} from 'react';
import {Button} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {Comment} from '../../../models/comment.model';

type Props = {
  comment: Comment;
  setReference: (comment: Comment) => void;
};

const CommentItemReferenceButton: FC<Props> = ({comment, setReference}: Props) => {
  const {t} = useTranslation();

  const updateReference = (): void => {
    setReference(comment);
  };

  return (
    <Button variant="outlined" size="small" color="primary" onClick={updateReference}>
      {t('comment:comment.buttons.response')}
    </Button>
  );
};

export default CommentItemReferenceButton;
