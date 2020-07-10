import * as React from 'react';
import {FC, useState} from 'react';
import {groupGridContainerStyles} from './_styles';
import {Grid} from '@material-ui/core';
import {defaultSize, Group, Size} from '../_types';
import GroupGridItem from './group-grid-item';
import {useSpring, useTrail} from 'react-spring';
import {ANIMATION_DURATION, CARD_HEADER_HEIGHT, CARD_RATIO} from '../_constants';

type Props = {
  groups: Group[];
  mode: string;
};

const GroupGridContainer: FC<Props> = ({groups, mode}: Props) => {
  const classes = groupGridContainerStyles();
  const [cardWidth, setCardWidth] = useState(0);
  const isNormalMode = mode === 'normal';

  const heightSpring = useSpring({
    delay: isNormalMode ? 0 : ANIMATION_DURATION,
    height: isNormalMode && cardWidth ? cardWidth * CARD_RATIO : CARD_HEADER_HEIGHT,
    config: {duration: ANIMATION_DURATION},
  });

  const opacitySpring = useSpring({
    delay: isNormalMode ? ANIMATION_DURATION : 0,
    opacity: isNormalMode ? 1 : 0,
    config: {duration: ANIMATION_DURATION},
  });

  const gridTrail = useTrail(groups.length, {
    delay: 50,
    opacity: 1,
    from: {opacity: 0},
  });

  return (
    <Grid container className={classes.container}>
      {gridTrail.map((style, index) => (
        <GroupGridItem
          key={index}
          index={index}
          group={groups[index]}
          setCardWidth={setCardWidth}
          heightSpring={heightSpring}
          opacitySpring={opacitySpring}
          style={style}
        />
      ))}
    </Grid>
  );
};

export default GroupGridContainer;
