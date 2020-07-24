import * as React from 'react';
import {FC} from 'react';
import {CardHeader, Typography} from '@material-ui/core';
import {groupSortingCardHeaderStyles} from './_styles';
import {ArrowAllIcon} from '../../../shared/components/icons/arrow-all-icon';

type Props = {
  title: string;
  bind: (...any) => void;
};

const GroupSortingCardHeader: FC<Props> = ({title, bind}: Props) => {
  const classes = groupSortingCardHeaderStyles();
  return (
    <CardHeader
      title={
        <Typography variant={'h6'} className={classes.caption}>
          {title}
        </Typography>
      }
      action={<ArrowAllIcon {...bind} />}
      className={classes.header}
    />
  );
};

export default GroupSortingCardHeader;
