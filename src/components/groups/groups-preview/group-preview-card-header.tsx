import * as React from 'react';
import {FC} from 'react';
import {CardHeader, IconButton, Typography} from '@material-ui/core';
import {DotsVerticalIcon} from '../../common/icons/dots-vertical-icon';
import {groupCardHeaderStyles} from './_styles';
import Link from '../../common/inputs/link';
import {Routes} from '../../router';
import {Group} from '../../../models/group.model';

type Props = {
  group: Group;
};

const GroupPreviewCardHeader: FC<Props> = ({group}: Props) => {
  const classes = groupCardHeaderStyles();
  return (
    <CardHeader
      title={
        <Link to={Routes.GROUPS + '/' + group.id}>
          <Typography variant={'h6'} className={classes.caption}>
            {group.title}
          </Typography>
        </Link>
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

export default GroupPreviewCardHeader;
