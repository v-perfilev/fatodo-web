import * as React from 'react';
import {FC} from 'react';
import {CardHeader, Typography} from '@material-ui/core';
import {groupSortingCardHeaderStyles} from './_styles';

type Props = {
  title: string;
};

const GroupSortingCardHeader: FC<Props> = ({title}: Props) => {
  const classes = groupSortingCardHeaderStyles();
  return (
    <CardHeader
      title={
        <Typography variant={'h6'} className={classes.caption}>
          {title}
        </Typography>
      }
      className={classes.header}
    />
  );
};

export default GroupSortingCardHeader;
