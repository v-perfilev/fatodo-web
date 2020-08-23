import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {itemViewContentStyles} from './_styles';

type Props = {
  description: string;
};

const ItemViewDescription: FC<Props> = ({description}: Props) => {
  const classes = itemViewContentStyles();

  return (
    <Box className={classes.root}>
      {description}
    </Box>
  );
};

export default ItemViewDescription;
