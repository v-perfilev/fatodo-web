import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import ReflectableClearableTextInput from '../../../inputs/clearable-text-input/reflectable-clearable-text-input';
import {commentsInputStyles} from './_styles';

type Props = {
  send: () => void;
  setMessage: (message: string) => void;
};

const CommentsInput: FC<Props> = ({send, setMessage}: Props) => {
  const classes = commentsInputStyles();
  const {t} = useTranslation();

  return (
    <ReflectableClearableTextInput
      className={classes.root}
      action={send}
      updateText={setMessage}
      placeholder={t('comment:footer.inputPlaceholder')}
    />
  );
};

export default CommentsInput;
