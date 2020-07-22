import * as React from 'react';
import {FC, memo} from 'react';
import {Card} from '@material-ui/core';
import GroupSortingCardHeader from './group-sorting-card-header';
import {groupSortingCardStyles} from './_styles';
import {GroupProps} from '../_types';
import {compose} from 'recompose';

type Props = GroupProps & {
  bind: (...any) => void;
};

const GroupSortingCard: FC<Props> = ({group, bind}: Props) => {
  const classes = groupSortingCardStyles();

  return (
    <Card square elevation={3} className={classes.card}>
      <GroupSortingCardHeader title={group.title} bind={bind} />
    </Card>
  );
};

export default compose(memo)(GroupSortingCard);
