import * as React from 'react';
import {FC, useState} from 'react';
import {groupGridContainerStyles} from './_styles';
import {Grid} from '@material-ui/core';
import {Group} from '../_types';
import GroupGridItem from './group-grid-item';
import {useSpring, useTrail} from 'react-spring';
import {ANIMATION_DURATION, CARD_HEADER_HEIGHT} from '../_constants';

interface Props {
  groups: Group[];
  mode: string;
}

const GroupGridContainer: FC<Props> = ({groups, mode}: Props) => {
  const classes = groupGridContainerStyles();
  const [cardHeight, setCardHeight] = useState();

  const isNormalMode = mode === 'normal';

  const cardHeightSpring = useSpring({
    delay: isNormalMode ? 0 : ANIMATION_DURATION,
    height: isNormalMode ? cardHeight ? cardHeight : 'auto' : CARD_HEADER_HEIGHT,
    config: {duration: ANIMATION_DURATION},
  });

  const bodyOpacitySpring = useSpring({
    delay: isNormalMode ? ANIMATION_DURATION : 0,
    opacity: isNormalMode ? 1 : 0,
    config: {duration: ANIMATION_DURATION},
  });

  const trail = useTrail(groups.length, {
    delay: 50,
    opacity: 1,
    from: {opacity: 0},
  });

  return (
    <Grid container className={classes.container}>
      {trail.map((style, index) =>
        <GroupGridItem key={index} {...{
          group: groups[index],
          style,
          cardHeightSpring,
          bodyOpacitySpring,
          setCardHeight,
        }} />,
      )}
    </Grid>
  );
};

export default GroupGridContainer;
