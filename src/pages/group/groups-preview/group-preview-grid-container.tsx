import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import GroupGridItem from './group-preview-grid-item';
import {groupGridContainerStyles} from './_styles';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import {CARD_RATIO} from '../_constants';
import {useResize} from '../../../shared/hooks/use-resize';
import GroupPreviewGridCreateButton from './group-preview-grid-create-button';

const GroupPreviewGridContainer: FC = () => {
  const classes = groupGridContainerStyles();
  const {objs: groups} = useGroupListContext();
  const sizes = useResize();
  const [itemRef, setItemRef] = useState<HTMLDivElement>();
  const [itemHeight, setItemHeight] = useState<number>(0);

  useEffect(() => {
    if (itemRef?.clientWidth) {
      setItemHeight(itemRef.clientWidth * CARD_RATIO);
    }
  }, [sizes, itemRef]);

  return (
    <Grid container className={classes.container}>
      {groups.map((group) => (
        <GroupGridItem key={group.id} group={group} height={itemHeight} />
      ))}
      <GroupPreviewGridCreateButton height={itemHeight} setRef={setItemRef} />
    </Grid>
  );
};

export default GroupPreviewGridContainer;
