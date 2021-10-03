import React, {FC} from 'react';
import {commentStubStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const CommentStub: FC = () => {
  const classes = commentStubStyles();
  const {t} = useTranslation();

  return <Box className={classes.root}>{t('comment:list.commentsNotFound')}</Box>;
};

export default CommentStub;
