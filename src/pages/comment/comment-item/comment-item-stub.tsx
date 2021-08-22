import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {commentItemStubStyles} from './_styles';

type Props = {};

const CommentItemStub: FC<Props> = () => {
  const classes = commentItemStubStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.root}>
      <Box className={classes.notFound}>{t('comment:list.commentsNotFound')}</Box>
    </Box>
  );
};

export default CommentItemStub;
