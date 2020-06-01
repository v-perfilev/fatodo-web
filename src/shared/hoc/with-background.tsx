import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box, Grid, Hidden} from '@material-ui/core';
import {backgroundStyles} from './_styles';
import Logo from '../../components/common/logo';
import LanguageSelect from '../../components/common/language-select';

const withBackground = (imgSrc: string, bodyCentred = true) => (Component: ComponentType): FC => (
  props
): ReactElement => {
  const classes = backgroundStyles();

  return (
    <Grid container>
      <Grid item sm md={8} lg className={classes.leftBox}>
        <Box className={classes.container}>
          <Box className={classes.header}>
            <Logo />
          </Box>
          <Box className={bodyCentred ? classes.body + ' ' + classes.bodyCentred : classes.body}>
            <Component {...props} />
          </Box>
          <Box className={classes.footer}>
            <LanguageSelect />
          </Box>
        </Box>
      </Grid>
      <Hidden smDown>
        <Grid item sm md={4} lg className={classes.rightBox}>
          <img src={imgSrc} className={classes.img} />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default withBackground;
