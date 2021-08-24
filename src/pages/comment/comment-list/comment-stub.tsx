import React, {FC} from 'react';
import {CommentItemProps} from '../types';
import {commentStubStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

type Props = CommentItemProps;

const CommentStub: FC = () => {
  const classes = commentStubStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.root}>
      {t('comment:list.commentsNotFound')}
    </Box>
  );
};

export default CommentStub;
