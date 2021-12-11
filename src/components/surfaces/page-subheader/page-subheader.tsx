import React, {FC, ReactNode} from 'react';
import {Box, Typography} from '@material-ui/core';
import {pageSubheaderStyles} from './_styles';

type Props = {
  title: ReactNode;
};

export const PageSubheader: FC<Props> = ({title}: Props) => {
  const classes = pageSubheaderStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">
        <Box fontWeight="fontWeightMedium">{title}</Box>
      </Typography>
    </Box>
  );
};
