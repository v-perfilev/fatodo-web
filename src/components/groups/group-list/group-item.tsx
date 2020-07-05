import * as React from 'react';
import {FC} from 'react';
import {Box, Grid} from '@material-ui/core';
import {groupItemStyles} from './_styles';
import {Group} from '../_types';
import GroupCard from '../group-card/group-card';
import cx from 'classnames';

interface Props {
  group: Group;
  mode: string;
}

const GroupItem: FC<Props> = ({group, mode}: Props) => {
  const classes = groupItemStyles();

  const isNormalMode = mode === 'normal';
  const isDndMode = !isNormalMode;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={cx(classes.item, {'dndMode': isDndMode})}>
      <Box className={cx(classes.innerBox, {'normalMode': isNormalMode})}>
        <GroupCard group={group} mode={mode} />
      </Box>
    </Grid>
  );
};

export default GroupItem;
