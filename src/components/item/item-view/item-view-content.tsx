import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {itemViewContentStyles} from './_styles';

type Props = {};

const ItemViewContent: FC<Props> = ({}: Props) => {
  const classes = itemViewContentStyles();

  return (
    <Box className={classes.root}>
      TODO content
    </Box>
  );
};

export default ItemViewContent;
