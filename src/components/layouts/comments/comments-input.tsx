import React, {FC} from 'react';
import {Box, Container} from '@material-ui/core';
import {commentsInputStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import ReflectableClearableTextInput from '../../inputs/clearable-text-input/reflectable-clearable-text-input';

type Props = {
  send: () => void;
  setMessage: (message: string) => void;
};

const CommentsInput: FC<Props> = ({send, setMessage}: Props) => {
  const classes = commentsInputStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.root}>
      <Container>
        <ReflectableClearableTextInput
          className={classes.input}
          action={send}
          updateText={setMessage}
          placeholder={t('chat:content.inputPlaceholder')}
        />
      </Container>
    </Box>
  );
};

export default CommentsInput;
