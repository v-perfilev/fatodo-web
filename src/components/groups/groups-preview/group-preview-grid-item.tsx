import * as React from 'react';
import {FC, memo} from 'react';
import {Grid} from '@material-ui/core';
import GroupCard from './group-preview-card';
import {groupGridItemStyles} from './_styles';
import {compose} from 'recompose';
import {Group} from '../../../models/group.model';

type Props = {
  group: Group;
};

const GroupPreviewGridItem: FC<Props> = ({group}: Props) => {
  const classes = groupGridItemStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item}>
      <GroupCard group={group} />
    </Grid>
  );
};

export default compose(memo)(GroupPreviewGridItem);
