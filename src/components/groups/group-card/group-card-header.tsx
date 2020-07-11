import * as React from 'react';
import {FC} from 'react';
import {CardHeader, IconButton, Typography} from '@material-ui/core';
import {DotsVerticalIcon} from '../../common/icons/dots-vertical-icon';
import {groupCardHeaderStyles} from './_styles';

type Props = {
  title: string;
};

const GroupCardHeader: FC<Props> = ({title}: Props) => {
  const classes = groupCardHeaderStyles();
  return (
    <CardHeader
      title={
        <Typography variant={'h6'} className={classes.caption}>
          {title}
        </Typography>
      }
      action={
        <IconButton aria-label="settings" className={classes.action}>
          <DotsVerticalIcon />
        </IconButton>
      }
      className={classes.header}
    />
  );
};

export default GroupCardHeader;
