import * as React from 'react';
import {FC, memo, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {groupGridItemStyles} from './_styles';
import {compose} from 'recompose';
import withGroupView from '../../../shared/hoc/with-view/with-group-view';
import {Group} from '../../../models/group.model';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import GroupPreviewCard from './group-preview-card';

type Props = {
  group: Group;
};

const GroupPreviewGridItem: FC<Props> = ({group}: Props) => {
  const classes = groupGridItemStyles();
  const {setObj: setGroup} = useGroupViewContext();

  useEffect(() => {
    setGroup(group);
  }, [group]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item}>
      <GroupPreviewCard />
    </Grid>
  );
};

export default compose(memo, withGroupView)(GroupPreviewGridItem);
