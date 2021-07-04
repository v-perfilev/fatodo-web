import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box, Grid, Hidden} from '@material-ui/core';
import {backgroundStyles} from './_styles';
import {LogoWithText} from '../../../components/layouts/logo';
import {LanguageSelect} from '../../../components/controls/language-select';

const withBackground = (imgSrc: string) => (Component: ComponentType): FC => (props): ReactElement => {
  const classes = backgroundStyles();

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Box className={classes.container}>
          <Box className={classes.header}>
            <LogoWithText />
          </Box>
          <Box className={classes.body}>
            <Component {...props} />
          </Box>
          <Box className={classes.footer}>
            <LanguageSelect />
          </Box>
        </Box>
      </Grid>
      <Hidden smDown>
        <Grid item md={6} className={classes.rightBox}>
          <Box className={classes.imgBox}>
            <img src={imgSrc} className={classes.img} />
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default withBackground;
