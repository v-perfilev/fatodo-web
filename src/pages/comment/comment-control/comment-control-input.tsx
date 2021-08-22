import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import ReflectableTextInput from '../../../components/inputs/clearable-text-input/reflectable-text-input';
import {commentControlInputStyles} from './_styles';

type Props = {
  send: () => void;
  setComment: (comment: string) => void;
};

const CommentControlInput: FC<Props> = ({send, setComment}: Props) => {
  const classes = commentControlInputStyles();
  const {t} = useTranslation();

  return (
    <ReflectableTextInput
      className={classes.root}
      action={send}
      updateText={setComment}
      placeholder={t('comment:control.inputPlaceholder')}
    />
  );
};

export default CommentControlInput;
