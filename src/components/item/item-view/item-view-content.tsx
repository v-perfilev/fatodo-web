import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {itemViewContentStyles} from './_styles';

type Props = {
  content: string;
};

const ItemViewContent: FC<Props> = ({content}: Props) => {
  const classes = itemViewContentStyles();

  return (
    <Box className={classes.root}>
      {content}
    </Box>
  );
};

export default ItemViewContent;
