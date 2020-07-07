import * as React from 'react';
import {FC} from 'react';
import {compose} from 'recompose';
import withCentering from '../shared/hoc/with-centering';
import {Box, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const items = Array.from(new Array(10), (val, index) => 'Test item ' + (index + 1));

const homeStyles = makeStyles(() => ({
  container: {
    width: 500,
  },
  item: {
    padding: 10,
  },
  box: {
    position: 'relative',
    paddingBottom: '100%',
  },
  innerBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'red',
  },
}));

const MyBox: FC<{children}> = ({children}) => {
  const classes = homeStyles();
  return (
    <Grid item xs={3} className={classes.item}>
      <Box className={classes.box}>
        <Box className={classes.innerBox}>
          {children}
        </Box>
      </Box>
    </Grid>
  );
};

const Home: FC = () => {
  const classes = homeStyles();

  return (
    <Grid container className={classes.container}>
      {items.map((item, index) => (
        <MyBox key={index}>{item}</MyBox>
      ))}
    </Grid>
  );
};

export default compose(withCentering)(Home);
