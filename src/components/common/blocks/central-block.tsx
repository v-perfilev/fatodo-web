import * as React from 'react';
import {FC} from 'react';
import {Grid} from '@material-ui/core';
import {CommonProps} from '@material-ui/core/OverridableComponent';
import {centralBlockStyles} from '../_styles';

const useStyles = centralBlockStyles;

export const CentralBlock: FC<CommonProps<any>> = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={8} sm={6} lg={4}>
        {props.children}
      </Grid>
    </Grid>
  );
};
