import {User} from '../../../models/user.model';
import React, {FC} from 'react';
import {CommentItem} from '../types';
import {Box} from '@material-ui/core';

type Props = {
  item: CommentItem;
  account: User;
};

const CommentItem: FC<Props> = ({item, account}: Props) => {
  return <Box>Test</Box>;
};

export default CommentItem;
