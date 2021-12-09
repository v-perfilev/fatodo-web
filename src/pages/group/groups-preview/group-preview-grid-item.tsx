import * as React from 'react';
import {FC, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {groupGridItemStyles} from './_styles';
import {Group} from '../../../models/group.model';
import GroupPreviewCard from './group-preview-card';
import {flowRight} from 'lodash';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';

type Props = {
  group: Group;
};

const GroupPreviewGridItem: FC<Props> = ({group}: Props) => {
  const classes = groupGridItemStyles();
  const {setGroup} = useGroupViewContext();

  useEffect(() => {
    if (group) {
      setGroup(group);
    }
  }, [group]);

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={3} className={classes.item}>
      <GroupPreviewCard />
    </Grid>
  );
};

export default flowRight([withGroupView])(GroupPreviewGridItem);
