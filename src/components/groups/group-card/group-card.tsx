import * as React from 'react';
import {FC, HTMLAttributes, useEffect} from 'react';
import {Card} from '@material-ui/core';
import GroupCardHeader from './group-card-header';
import {groupCardStyles} from './_styles';
import {GroupProps, GroupSpringProps, SizeProps} from '../_types';
import {animated} from 'react-spring';
import GroupCardBody from './group-card-body';
import {compose} from 'recompose';
import {withResizeDetector} from 'react-resize-detector';

type Props = HTMLAttributes<any> & GroupProps & GroupSpringProps & SizeProps;

const GroupCard: FC<Props> = ({width, setCardWidth, group, opacitySpring, style}: Props) => {
  const classes = groupCardStyles();

  useEffect(() => {
    setCardWidth(width);
  }, [width]);

  return (
    <Card square elevation={3} className={classes.card} style={style}>
      <GroupCardHeader title={group.title} />
      <GroupCardBody group={group} style={opacitySpring} />
    </Card>
  );
};

export default compose(animated, withResizeDetector)(GroupCard);
