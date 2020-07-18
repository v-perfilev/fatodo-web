import * as React from 'react';
import {FC, useEffect, useRef, useState} from 'react';
import {Card} from '@material-ui/core';
import GroupCardHeader from './group-card-header';
import {groupCardStyles} from './_styles';
import {GroupProps} from '../_types';
import GroupCardBody from './group-card-body';
import {useResize} from '../../../shared/hooks/use-resize';
import {CARD_RATIO} from '../_constants';

type Props = GroupProps;

const GroupCard: FC<Props> = ({group}: Props) => {
  const classes = groupCardStyles();

  const sizes = useResize();
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(ref.current.clientWidth * CARD_RATIO);
  }, [sizes, ref]);

  const cardStyle = {height: height};

  return (
    <Card square elevation={3} className={classes.card} style={cardStyle} ref={ref}>
      <GroupCardHeader title={group.title} />
      <GroupCardBody group={group} />
    </Card>
  );
};

export default GroupCard;
