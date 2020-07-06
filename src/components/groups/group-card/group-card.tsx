import * as React from 'react';
import {CSSProperties, FC} from 'react';
import {Card} from '@material-ui/core';
import GroupCardHeader from './group-card-header';
import {groupCardStyles} from './_styles';
import {Group} from '../_types';
import {animated} from 'react-spring';
import GroupCardBody from './group-card-body';
import {compose} from 'recompose';

interface Props {
  group: Group;
  style: CSSProperties;
  bodyOpacitySpring: CSSProperties;
}

const GroupCard: FC<Props> = ({group, style, bodyOpacitySpring}: Props) => {
  const classes = groupCardStyles();

  return (
    <Card square elevation={3} className={classes.card} style={style}>
      <GroupCardHeader title={group.title} />
      <GroupCardBody {...{group, style: bodyOpacitySpring}} />
    </Card>
  );
};

export default compose(animated)(GroupCard);
