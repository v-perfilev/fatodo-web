import React, {FC} from 'react';
import {commentsStyles} from './_styles';
import {Box} from '@material-ui/core';
import CommentsFooter from './comments-footer';
import CommentsList from './comments-list';

type Props = {
  id: string;
}

const Comments: FC<Props> = ({id}: Props) => {
  const classes = commentsStyles();

  return (
    <Box className={classes.root}>
      <CommentsList />
      <CommentsFooter />
    </Box>
  );
};


export default Comments;
