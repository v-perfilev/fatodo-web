import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import ReflectableTextInput from '../../../components/inputs/clearable-text-input/reflectable-text-input';
import {commentsInputStyles} from './_styles';

type Props = {
  send: () => void;
  setMessage: (message: string) => void;
};

const CommentInput: FC<Props> = ({send, setMessage}: Props) => {
  const classes = commentsInputStyles();
  const {t} = useTranslation();

  return (
    <ReflectableTextInput
      className={classes.root}
      action={send}
      updateText={setMessage}
      placeholder={t('comment:footer.inputPlaceholder')}
    />
  );
};

export default CommentInput;
