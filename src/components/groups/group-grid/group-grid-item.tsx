import * as React from 'react';
import {CSSProperties, FC, useEffect, useRef, useState} from 'react';
import {Grid} from '@material-ui/core';
import {groupGridItemStyles} from './_styles';
import {Group} from '../_types';
import GroupCard from '../group-card/group-card';
import {animated} from 'react-spring';
import {compose} from 'recompose';
import {useResize} from '../../../shared/hooks/use-resize';
import {CARD_RATIO} from '../_constants';

interface Props {
  group: Group;
  style: CSSProperties;
  cardHeightSpring: CSSProperties;
  bodyOpacitySpring: CSSProperties;
  setCardHeight: (height) => void;
}

const GroupGridItem: FC<Props> = ({group, style, cardHeightSpring, bodyOpacitySpring, setCardHeight}: Props) => {
  const classes = groupGridItemStyles();
  const sizes = useResize();
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(ref.current.clientWidth * CARD_RATIO);
  }, [sizes, ref]);

  useEffect(() => {
    setCardHeight(height);
  }, [height]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item} style={style} ref={ref}>
      <GroupCard {...{group, style: {height: height, ...cardHeightSpring}, bodyOpacitySpring}} />
    </Grid>
  );
};

export default compose(animated)(GroupGridItem);
