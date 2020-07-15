import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Grid} from '@material-ui/core';
import {groupGridItemStyles} from './_styles';
import {GroupProps} from '../_types';
import GroupCard from '../group-card/group-card';
import {animated} from 'react-spring';
import {compose} from 'recompose';

type Props = HTMLAttributes<any> & GroupProps;

const GroupGridItem: FC<Props> = ({group, style}: Props) => {
  const classes = groupGridItemStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item} style={style}>
      <GroupCard group={group} />
    </Grid>
  );
};

export default compose(animated)(GroupGridItem);