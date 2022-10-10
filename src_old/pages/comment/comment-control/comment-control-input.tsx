import React, {FC, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import ReflectableTextInput from '../../../components/inputs/ReflectableTextInput';
import {commentControlInputStyles} from './_styles';
import {Comment} from '../../../models/comment.model';

type Props = {
  send: () => void;
  comment: string;
  setComment: (comment: string) => void;
  reference?: Comment;
};

const CommentControlInput: FC<Props> = ({send, comment, setComment, reference}: Props) => {
  const classes = commentControlInputStyles();
  const {t} = useTranslation();
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    if (reference) {
      ref.current.focus();
    }
  }, [reference]);

  return (
    <ReflectableTextInput
      className={classes.root}
      action={send}
      text={comment}
      updateText={setComment}
      placeholder={t('comment:control.inputPlaceholder')}
      inputRef={ref}
    />
  );
};

export default CommentControlInput;
