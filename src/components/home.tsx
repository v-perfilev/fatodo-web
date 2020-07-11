import * as React from 'react';
import {FC, useEffect} from 'react';
import {compose} from 'recompose';
import {Box, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {animated} from 'react-spring';
import withSortableGrid, {SortingProps} from '../shared/hoc/with-sortable-grid';

const items = Array.from(new Array(9), (val, index) => 'Test item ' + (index + 1));

const homeStyles = makeStyles(() => ({
  container: {
    position: 'relative',
  },
  item: {
    position: 'absolute',
    width: '100%',
    height: 150,
    padding: 10,
  },
  box: {
    border: '1px solid red',
    display: 'flex',
    height: '100%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'grey',
    userSelect: 'none',
    cursor: 'pointer',
  },
}));

const CustomBox: FC<{bind; style; children}> = ({bind, style, children}: any) => {
  const classes = homeStyles();
  return (
    <Grid item xs={3} {...bind} className={classes.item} style={style}>
      <Box className={classes.box}>{children}</Box>
    </Grid>
  );
};

const AnimatedBox = compose(animated)(CustomBox);

type Props = SortingProps;

const Home: FC<Props> = (props: Props) => {
  const classes = homeStyles();
  const {sortingRef, setSortingItems, sortingBind, sortingSprings} = props;

  useEffect(() => {
    setSortingItems(items);
  }, []);

  return (
    <Grid container className={classes.container} ref={sortingRef}>
      {sortingSprings.map((style, i) => (
        <AnimatedBox key={i} bind={sortingBind(i)} style={style}>
          {items[i]}
        </AnimatedBox>
      ))}
    </Grid>
  );
};

export default compose(withSortableGrid)(Home);
