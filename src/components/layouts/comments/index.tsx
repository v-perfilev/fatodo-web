import React, {FC} from 'react';
import CommentsInput from './comments-input';
import CommentsList from './comments-list';
import {commentsStyles} from './_styles';
import {Box} from '@material-ui/core';


const Comments: FC = () => {
  const classes = commentsStyles();

  return (
    <Box className={classes.root}>
      <CommentsInput send={console.log} setMessage={console.log} />
      <CommentsList />
    </Box>
  );
};


export default Comments;
