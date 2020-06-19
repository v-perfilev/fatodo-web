import * as React from 'react';
import {FC, useState} from 'react';
import {Box, Card, CardContent, CardHeader, Fab, IconButton, Theme} from '@material-ui/core';
import {compose} from 'recompose';
import {makeStyles} from '@material-ui/core/styles';
import {PlusIcon} from './common/icons/plus-icon';
import {Masonry} from 'masonic';
import {DotsVerticalIcon} from './common/icons/dots-vertical-icon';

export const homeStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 10,
  },
  masonry: {
    outline: 'none',
  },
  cardHeader: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottom: '1px solid ' + theme.palette.secondary.main,
    '& .MuiCardHeader-action': {
      margin: 0,
      marginRight: -10
    }
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Home: FC = () => {
  const classes = homeStyles();
  const [cards, setCards] = useState([]);

  const getRandomNumber = (min, max): number => Math.floor((max - min) * Math.random() + min);

  const addRandomCard = (): void => {
    setCards(prevState => [...prevState, {height: getRandomNumber(200, 300)}]);
  };

  const MasonryCard = ({data}) => <Card elevation={3} square style={{height: data.height}}>
    <CardHeader
      title="Test test test test test"
      titleTypographyProps={{variant: 'subtitle1'}}
      action={<IconButton><DotsVerticalIcon /></IconButton>}
      className={classes.cardHeader}
    />
    <CardContent>
      Test content
    </CardContent>
  </Card>;

  return (
    <Box className={classes.root}>
      <Masonry items={cards} render={MasonryCard} columnWidth={300} columnGutter={15} className={classes.masonry} />
      <Fab className={classes.fab} color="primary" onClick={addRandomCard}>
        <PlusIcon />
      </Fab>
    </Box>
  );
};

export default compose()(Home);
