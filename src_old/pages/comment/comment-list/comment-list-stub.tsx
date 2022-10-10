import React, {FC} from 'react';
import {commentListStubStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const CommentListStub: FC = () => {
  const classes = commentListStubStyles();
  const {t} = useTranslation();

  return <Box className={classes.root}>{t('comment:list.commentsNotFound')}</Box>;
};

export default CommentListStub;
