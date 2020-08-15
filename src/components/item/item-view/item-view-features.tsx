import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {itemViewFeaturesStyles} from './_styles';

type Props = {};

const ItemViewFeatures: FC<Props> = ({}: Props) => {
  const classes = itemViewFeaturesStyles();

  return (
    <Box className={classes.root}>
      TODO features
    </Box>
  );
};

export default ItemViewFeatures;
