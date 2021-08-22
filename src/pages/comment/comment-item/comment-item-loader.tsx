import React, {FC} from 'react';
import {Box} from '@material-ui/core';

type Props = {
  parentId?: string;
};

const CommentItemLoader: FC<Props> = () => {
  return <Box>Test</Box>;
};

export default CommentItemLoader;
