import * as React from 'react';
import {FC, memo, useEffect, useRef, useState} from 'react';
import {Grid} from '@material-ui/core';
import {groupGridItemStyles} from './_styles';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {Group} from '../../../models/group.model';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import GroupPreviewCard from './group-preview-card';
import {flowRight} from 'lodash';
import {CARD_RATIO} from '../_constants';
import {useResize} from '../../../shared/hooks/use-resize';

type Props = {
  group: Group;
};

const GroupPreviewGridItem: FC<Props> = ({group}: Props) => {
  const classes = groupGridItemStyles();
  const sizes = useResize();
  const {setObj: setGroup} = useGroupViewContext();
  const ref = useRef(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setGroup(group);
  }, [group]);

  useEffect(() => {
    if (ref.current?.clientWidth) {
      setHeight(ref.current.clientWidth * CARD_RATIO);
    }
  }, [sizes, ref]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item} ref={ref}>
      <GroupPreviewCard height={height} />
    </Grid>
  );
};

export default flowRight([memo, withGroupView])(GroupPreviewGridItem);
