import * as React from 'react';
import {FC} from 'react';
import {Card} from '@material-ui/core';
import GroupSortingCardHeader from './group-sorting-card-header';
import {groupSortingCardStyles} from './_styles';
import {GroupProps} from '../_types';

type Props = GroupProps;

const GroupSortingCard: FC<Props> = ({group}: Props) => {
  const classes = groupSortingCardStyles();

  return (
    <Card square elevation={3} className={classes.card}>
      <GroupSortingCardHeader title={group.title} />
    </Card>
  );
};

export default GroupSortingCard;
