import * as React from 'react';
import {FC} from 'react';
import {Box, CardHeader, Typography} from '@material-ui/core';
import {groupSortingCardHeaderStyles} from './_styles';
import {Group} from '../../../models/group.model';
import RoundPic from '../../common/images/round-pic';
import GroupSortingCardActions from './group-sorting-card-actions';

type Props = {
  group: Group;
  bind: (...any) => void;
};

const GroupSortingCardHeader: FC<Props> = ({group, bind}: Props) => {
  const classes = groupSortingCardHeaderStyles();

  return (
    <CardHeader
      title={
        <Box className={classes.title}>
          {group.imageFilename && <RoundPic url={group.imageFilename} size="md" />}
          <Typography variant={'h6'} className={classes.caption}>
            {group.title}
          </Typography>
        </Box>
      }
      action={<GroupSortingCardActions bind={bind} />}
      className={classes.root}
    />
  );
};

export default GroupSortingCardHeader;
