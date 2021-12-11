import * as React from 'react';
import {FC, HTMLAttributes, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {animated} from 'react-spring';
import GroupSortingCard from './groups-sorting-card';
import {groupsSortingGridItemStyles} from './_styles';
import {Group} from '../../../models/group.model';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {flowRight} from 'lodash';

type Props = HTMLAttributes<HTMLElement> & {
  group: Group;
  bind: (...any) => void;
  setItemRef: (element: HTMLDivElement) => void;
};

const GroupsSortingGridItem: FC<Props> = ({group, style, bind, setItemRef}: Props) => {
  const classes = groupsSortingGridItemStyles();
  const {setGroup} = useGroupViewContext();

  useEffect(() => {
    setGroup(group);
  }, [group]);

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={3} className={classes.item} style={style} ref={setItemRef}>
      <GroupSortingCard bind={bind} />
    </Grid>
  );
};

export default flowRight([animated, withGroupView])(GroupsSortingGridItem);
