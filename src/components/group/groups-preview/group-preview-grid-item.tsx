import * as React from 'react';
import {FC, memo, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import GroupCard from './group-preview-card';
import {groupGridItemStyles} from './_styles';
import {compose} from 'recompose';
import withGroupView from '../../../shared/hoc/with-group-view';
import {Group} from '../../../models/group.model';
import {useGroupViewContext} from '../../../shared/contexts/group-view-context';

type Props = {
  group: Group;
};

const GroupPreviewGridItem: FC<Props> = ({group}: Props) => {
  const classes = groupGridItemStyles();
  const {setGroup} = useGroupViewContext();

  useEffect(() => {
    setGroup(group);
  }, [group]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item}>
      <GroupCard />
    </Grid>
  );
};

export default compose(memo, withGroupView)(GroupPreviewGridItem);
