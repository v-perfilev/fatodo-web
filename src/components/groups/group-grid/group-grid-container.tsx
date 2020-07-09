import * as React from 'react';
import {FC} from 'react';
import {groupGridContainerStyles} from './_styles';
import {Grid} from '@material-ui/core';
import {Group} from '../_types';
import GroupGridItem from './group-grid-item';
import {useSpring, useTrail} from 'react-spring';
import {ANIMATION_DURATION, CARD_HEADER_HEIGHT, CARD_RATIO} from '../_constants';
import {compose} from 'recompose';
import withSizes, {SizeProps} from '../../../shared/hoc/with-sizes';

type Props = SizeProps & {
  groups: Group[];
  mode: string;
};

const GroupGridContainer: FC<Props> = ({gridRef, groups, mode}: Props) => {
  const classes = groupGridContainerStyles();

  const cardSize = {width: 100, height: 100};

  const isNormalMode = mode === 'normal';

  const heightSpring = useSpring({
    delay: isNormalMode ? 0 : ANIMATION_DURATION,
    height: isNormalMode && cardSize.width ? cardSize.width * CARD_RATIO : CARD_HEADER_HEIGHT,
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
    <Grid container className={classes.container} ref={gridRef}>
      {gridTrail.map((style, index) => (
        <GroupGridItem
          key={index}
          style={style}
          group={groups[index]}
          {...{heightSpring, opacitySpring}}
        />
      ))}
    </Grid>
  );
};

export default compose(withSizes)(GroupGridContainer);
