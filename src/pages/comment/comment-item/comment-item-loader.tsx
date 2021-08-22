import React, {FC, useMemo} from 'react';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import {commentItemLoaderStyles} from './_styles';
import {CircularSpinner} from '../../../components/loaders';

type Props = {
  parentId?: string;
};

const CommentItemLoader: FC<Props> = ({parentId}: Props) => {
  const classes = commentItemLoaderStyles();

  const isChild = useMemo((): boolean => {
    return !!parentId;
  }, [parentId]);

  const classNames = csx(classes.root, {[classes.child]: isChild});

  return (
    <Box className={classNames}>
      <CircularSpinner size="sm" />
    </Box>
  );
};

export default CommentItemLoader;
