import * as React from 'react';
import {FC} from 'react';
import {CardHeader, Typography} from '@material-ui/core';
import {groupPreviewCardHeaderStyles} from './_styles';

type Props = {
  title: string;
};

const GroupPreviewCardHeader: FC<Props> = ({title}: Props) => {
  const classes = groupPreviewCardHeaderStyles();
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

export default GroupPreviewCardHeader;
