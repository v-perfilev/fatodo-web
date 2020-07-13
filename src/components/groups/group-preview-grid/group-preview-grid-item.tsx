import * as React from 'react';
import {FC, HTMLAttributes, RefAttributes} from 'react';
import {Grid} from '@material-ui/core';
import {groupPreviewGridItemStyles} from './_styles';
import {GroupProps} from '../_types';
import {animated} from 'react-spring';
import {compose} from 'recompose';
import GroupPreviewCard from '../group-preview/group-preview-card';

type Props = RefAttributes<any> & HTMLAttributes<any> & GroupProps & {
  bind: (...any) => void,
};

const GroupPreviewGridItem: FC<Props> = ({group, style, bind, ref}: Props) => {
  const classes = groupPreviewGridItemStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item} style={style} {...bind} ref={ref}>
      <GroupPreviewCard group={group} />
    </Grid>
  );
};

export default compose(animated)(GroupPreviewGridItem);
