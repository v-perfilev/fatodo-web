import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import ReflectableTextInput from '../../../components/inputs/clearable-text-input/reflectable-text-input';
import {commentControlInputStyles} from './_styles';

type Props = {
  send: () => void;
  setMessage: (message: string) => void;
};

const CommentControlInput: FC<Props> = ({send, setMessage}: Props) => {
  const classes = commentControlInputStyles();
  const {t} = useTranslation();

  return (
    <ReflectableTextInput
      className={classes.root}
      action={send}
      updateText={setMessage}
      placeholder={t('comment:control.inputPlaceholder')}
    />
  );
};

export default CommentControlInput;
