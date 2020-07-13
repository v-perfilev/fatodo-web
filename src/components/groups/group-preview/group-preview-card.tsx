import * as React from 'react';
import {FC} from 'react';
import {Card} from '@material-ui/core';
import GroupPreviewCardHeader from './group-preview-card-header';
import {groupPreviewCardStyles} from './_styles';
import {GroupProps} from '../_types';

type Props = GroupProps;

const GroupPreviewCard: FC<Props> = ({group}: Props) => {
  const classes = groupPreviewCardStyles();

  return (
    <Card square elevation={3} className={classes.card}>
      <GroupPreviewCardHeader title={group.title} />
    </Card>
  );
};

export default GroupPreviewCard;
